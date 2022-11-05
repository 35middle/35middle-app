import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import React from 'react';

// const timer: any = null;
const CustomButton = (props: { name: string }) => {
  const Contained = () => {
    window.open('https://www.google.com.au');
  };
  // const [isDaat, setDate] = React.useState(true);

  const top = 260; // 控制 按钮位置
  const left = 260; // 控制 按钮位置
  return (
    <div className="content">
      <div
        style={{
          position: 'absolute',
          top,
          left,
        }}
      >
        {
          <Button
            variant="contained"
            endIcon={<AddShoppingCartIcon />}
            aria-label="add to shopping cart"
            onClick={Contained}
          >
            {/* ADD TO CART */}
            {props.name}
          </Button>
        }
      </div>
    </div>
  );
};

export default CustomButton;
