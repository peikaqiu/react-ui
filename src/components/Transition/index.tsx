import React, {FC} from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-right' | 'zoom-in-bottom';

export type TransitionProps <Ref extends undefined | HTMLElement = undefined> = CSSTransitionProps<Ref> & {
  animation?: AnimationName,
  wrapper?: boolean //防止内层元素也设置了transition动画导致覆盖
}

const Transition:FC<TransitionProps> = (props) => {
  const {children, classNames, animation, wrapper, ...restProps} = props;

  return(
    <CSSTransition
      classNames = { classNames ? classNames : animation}
      {...restProps}
    >
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  )
}

Transition.defaultProps = {
  unmountOnExit: true,
  apper: 'true'
}

export default Transition;