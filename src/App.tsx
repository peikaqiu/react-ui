import React, { useState } from 'react';
import Button from './components/Button';
import Alert from './components/Alert';


import Menu from './components/Menu/Menu';
import MenuItem from './components/Menu/MenuItem';
import SubMenu from './components/Menu/subMenu'
import Input from './components/Input'
import AutoComplete, {DataSourceType} from './components/AutoComplete'

import Upload from './components/Upload';
import Progress from './components/Progress';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Icon from './components/Icon';
library.add(fas);

function App() {
  const [value, setvalue] = useState('');

  //同步
  // const handleFetch = (val: string) => {
  //   // let arr = ['james', 'AD', 'zhuang', 'jiasao', 'kuzma']; //这个已经不被允许 需要定义成 [{value:'xx',..},{value:'yy',..}]
  //   // return arr.filter(name => name.includes(val)).map(name => ({value: name}));
  //   let arr = [{value:'james',number:23}, {value:'AD',number:3}, {value:'zhuang',number:11}, {value:'jiasao',number:16}, {value:'kuzma',number:0}];
  //   return arr.filter(name => name.value.includes(val));
  // }

  //异步
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({items}) => {
        return items.slice(0,10).map((item: any) => ({value: item.login, ...item}))
      })
  }
  

  const renderOption = (item: DataSourceType<any>) => {
    return (
      <>
        <h2>{item.value}</h2>
        <p>{item.id}</p>
      </>
    )
  }

  //上传前判断文件大小
  // const checkFileSize = (file: File) => {
  //   if(Math.round(file.size / 1024) > 50){
  //     console.log('图片大于50K');
  //     return false;
  //   }
  //   return true;
  // }

  //重命名文件
  // const filePromise = (file: File) => {
  //   const newFile = new File([file], 'new_name.docx', {type: file.type});
  //   return Promise.resolve(newFile);
  // }

  //初始化文件列表
  // const defaultFileList: UploadFile[] = [
  //   {uid:'1',size:1234,name:'1.md',status:'uploading',per:30},
  //   {uid:'2',size:1234,name:'2.md',status:'success',per:30},
  //   {uid:'3',size:1234,name:'3.md',status:'error',per:30},
  // ]


  return (
    <div className="App">
      <div>
        <Button onClick={() => { console.log('click') }}>default</Button>
        <Button className="custom" btnType="primary">primary</Button>
        <Button btnType="danger" onClick={e => { console.log(value); }}>danger</Button>

        <Button btnType="link" href='https://www.baidu.com' target="_blank">link</Button>

        <Button disabled>disabled</Button>
        <Button btnType="link" href='https://www.baidu.com' disabled>link disabled</Button>


        <Button size="lg">size Large</Button>
        <Button>size default</Button>
        <Button size="sm">size small</Button>
      </div>


      <div>
        <Alert onClose={() => { console.log('关闭后的回调'); }} title="title" alertType="default" showClose={true}></Alert>
        <Alert onClose={() => { console.log('关闭后的回调'); }} title="title" alertType="success" showClose={true}>messagemessagemessagemessagemessage</Alert>
      </div>

      <Menu defaultIndex='0' onSelect={(index) => { console.log(index) }} defalutOpenSubMenus={['3']}>
        <MenuItem>1</MenuItem>
        <MenuItem>2</MenuItem>
        <MenuItem>3</MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>4</MenuItem>
          <MenuItem>5</MenuItem>
          <MenuItem>6</MenuItem>
        </SubMenu>
        <SubMenu title="dropdown2">
          <MenuItem>4</MenuItem>
          <MenuItem>5</MenuItem>
          <MenuItem>6</MenuItem>
        </SubMenu>
      </Menu>

      <Icon icon="bahai" size="10x" theme="danger" /><br />

      <div>
        <Input size="sm" style={{ width: 150 }} placeholder='请输入'>sm</Input>
        <Input size="lg" style={{ width: 150 }}>sm</Input>
        <Input size="sm" style={{ width: 150 }} disabled>sm disabled</Input>
        <Input size="lg" style={{ width: 150 }} icon="search"></Input>
        <Input size="sm" prepend="前缀"></Input>
        <Input size="sm" append="后缀" value={value} onChange={(e) => { setvalue(e.target.value) }}></Input>
      </div>

      <AutoComplete
        fetchSuggestions={handleFetch}
        onSelect={(item) => { console.log(item); }}
        renderOption={renderOption}
      ></AutoComplete>

      <Upload 
        action="http://jsonplaceholder.typicode.com/comments?postId=1"
        onProcess = {(per) => {console.log(per);}}
        onSuccess = {() => {console.log('onSuccess');}}
        onError = {() => {console.log('onError');}}
        onChange = {() => {console.log('onChange');}}
        // beforeUpload = {filePromise}
        // defaultList = {defaultFileList}
        onRemove = {(file) => {console.log(file);}}
        data = {{'key': 'value'}}
        headers = {{'X-Powered':'xxx'}}
        name="hahaha"

        accept=".jpg"
        multiple

        drag
      > 
        <Icon icon="upload" size="5x" theme="secondary" />  <br/>
        <p>Drag file over to upload</p>
      </Upload>

      <Progress percent={30} strokeHeight={20}></Progress>
    </div>
  );
}

export default App;
