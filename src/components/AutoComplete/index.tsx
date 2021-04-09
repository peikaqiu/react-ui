import React, {ChangeEvent, FC, useState, ReactElement, useEffect, KeyboardEvent, useRef} from 'react';
import Input, {InputProps} from "../Input";
import Icon from '../Icon';
import useDebounce from '../../hooks/useDebounce'; //防抖
import useClickOutSide from '../../hooks/useClickOutSide'; //点击外层关闭弹窗
import classNames from 'classnames';

//处理复杂数据类型
interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
}

const AutoComplete:FC<AutoCompleteProps> = (props) => {
  const {fetchSuggestions, onSelect, value, renderOption, ...restProps} = props;

  const [inputValue, setInputValue] = useState(value as string);
  const [suggestions, setSuggestions] = useState<DataSourceType []>([]);
  const [loading, setLoading] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const triggerSearch = useRef(false);//选择不请求接口
  const componentRef = useRef<HTMLDivElement>(null);//组件dom Ref

  const debouncedValue = useDebounce(inputValue, 1000);
  useClickOutSide(componentRef, () => { setSuggestions([])});

  //使用防抖
  useEffect(() => {
    if(debouncedValue && triggerSearch.current){
      const result = fetchSuggestions(debouncedValue);

      if(result instanceof Promise){
        setLoading(true);
        result.then(data => {
          setLoading(false);
          setSuggestions(data);
        })
      }else{
        setSuggestions(result);
      }
    }else{
      setSuggestions([]);
    }
    setHighlightIndex(-1);
  }, [debouncedValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.trim()
    setInputValue(value);
    triggerSearch.current = true;
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const highlight = (index: number) => {
      if(index < 0) index = 0;
      if(index >= suggestions.length) index = suggestions.length - 1;
      setHighlightIndex(index);
    }
    switch (e.key){
      case 'ArrowUp':
        highlight(highlightIndex -1)
        break
      case 'ArrowDown':
        highlight(highlightIndex +1)
        break
      case 'Enter':
        suggestions[highlightIndex] && handleSelect(suggestions[highlightIndex])
        break 
      case 'Escape':
        setSuggestions([]);
        break
      default :
        break
    }
  }

  //选择哪项
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setSuggestions([]);
    onSelect && onSelect(item);
    triggerSearch.current = false;
  }

  //自定义模板
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }

  const generateDropdown = () => {
    return ( 
      <ul>
        {
          suggestions.map((item, index) => {
            const classes = classNames('suggestion-item', {
              'item-highlight': index === highlightIndex
            })
            return (
              <li key={index} className = {classes} onClick = {() => handleSelect(item)}>
                {renderTemplate(item)}
              </li>
            )
          })
        }
      </ul>
    )
  }

  return (
    <div ref={componentRef}>
      <Input value={inputValue || ''} {...restProps} onChange = {handleChange} onKeyDown = {handleKeyDown}></Input>
      {loading && <Icon icon="spinner" spin></Icon>}
      {suggestions.length > 0 && generateDropdown()}
    </div>
  )
}

export default AutoComplete;