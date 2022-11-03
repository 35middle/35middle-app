
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import React from 'react';

const CustomButton = (props: { name: string }) => {
  const newPage = () => {
    window.open('https://www.myer.com.au');
  };

  const top = 260;
  const left = 260;

  return (
    <div>
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
            onClick={newPage}
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
