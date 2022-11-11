// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/naming-convention
interface buttonStyletype {
  name: string;
  text: string;
  top: number;
  left: number;
  url: string;
  size: 'small' | 'medium' | 'large';
  style: 'circle' | 'party';
}
interface CustomButton {
  buttonStyle: buttonStyletype;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const CustomButton = (props: CustomButton) => {
  const { buttonStyle } = props;
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { text, top, left, url, size, style } = buttonStyle;

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const buttonsClick = () => {
    window.open(`https://${url}`);
  };


  return (
    <div>
      <div
        style={{
          position: 'absolute',
          top: `${top}%`,
          left: `${left}%`,
        }}
      >
        {
          <Button
            variant="contained"
            size={size}
            onClick={buttonsClick}
            className="bg-pink"
            style={{
              borderRadius: style === 'circle' ? '50px' : '3px',
            }}
          >
            {text}
          </Button>
        }
      </div>
    </div>
  );
};

export default CustomButton;
