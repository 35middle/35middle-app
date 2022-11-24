// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import React from 'react';
import type { DraggableEvent } from 'react-draggable';
import Draggable from 'react-draggable';
// eslint-disable-next-line @typescript-eslint/naming-convention
interface ButtonStyleType {
  startTime: number | undefined;
  endTime: number | undefined;
  jumpToTime: number | undefined;
  name: string;
  text: string;
  top: string;
  left: string;
  url: string | undefined;
  size: 'small' | 'medium' | 'large';
  style: 'circle' | 'party';
}
interface CustomButton {
  buttonStyle: ButtonStyleType;
  draggleRef: any;
  setButtonStyle: Function;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const CustomButton = (props: CustomButton) => {
  const { buttonStyle, draggleRef, setButtonStyle, onClick } = props;
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { text, top, left, size, style } = buttonStyle;
  // const [isOnclick, setIsOnclick] = React.useState(true);

  // eslint-disable-next-line @typescript-eslint/no-shadow

  const ButtonRef: any = React.useRef(null);

  const onStart = (_event: DraggableEvent) => {
    _event.preventDefault();
    _event.stopPropagation();
    // console.log('DraggableEvent11');
    // setIsOnclick(false);
    ButtonRef.current.onClick = null;
  };

  const positionX = React.useMemo(() => {
    const ButtonWidth = ButtonRef.current?.offsetWidth;
    const moveWidth = 600 - ButtonWidth;
    const value = left === '0' ? 0 : (moveWidth * +left) / 100;
    // console.log(left, value, 'positionX');
    return value;
  }, [left]);

  const positionY = React.useMemo(() => {
    const ButtonHeight = ButtonRef.current?.offsetHeight;
    const moveLength = 400 - ButtonHeight;
    const value = top === '0' ? 0 : (moveLength * +top) / 100;
    // console.log(top, value, 'positionY');
    return value;
  }, [top]);

  const onStop = (_event: DraggableEvent, uiData: any) => {
    const { lastX, lastY } = uiData;
    _event.preventDefault();
    _event.stopPropagation();

    const ButtonWidth = ButtonRef.current?.offsetWidth;
    const moveWidth = 600 - ButtonWidth;

    const ButtonHeight = ButtonRef.current?.offsetHeight;
    const moveLength = 400 - ButtonHeight;

    const widthPercentage = Math.trunc((lastX / moveWidth) * 100);
    const HeightPercentage = Math.trunc((lastY / moveLength) * 100);
    // console.log('DraggableEvent22');
    //  setIsOnclick(true);
    //  setTimeout(() => {
    //    setIsOnclick(true);
    //  });
    setButtonStyle((v: any) => ({
      ...v,
      top: HeightPercentage,
      left: widthPercentage,
    }));
  };

  return (
    <Draggable
      onStart={(event) => onStart(event)}
      onStop={(event, uiData) => onStop(event, uiData)}
      bounds="parent"
      offsetParent={draggleRef.current}
      position={{ x: positionX, y: positionY }}
    >
      <Button
        ref={ButtonRef}
        variant="contained"
        size={size}
        style={{
          position: 'absolute',
          top: `0`,
          left: `0`,
          borderRadius: style === 'circle' ? '50px' : '3px',
        }}
      >
        <span onClick={onClick}> {text}</span>
      </Button>
    </Draggable>
  );
};

export default CustomButton;
