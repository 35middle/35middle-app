// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import React from 'react';
// eslint-disable-next-line @typescript-eslint/naming-convention
interface buttonPreviewStyleType {
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
interface CustomButtonPreview {
  buttonPreviewStyle: buttonPreviewStyleType;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const CustomButtonPreview = (props: CustomButtonPreview) => {
  const { buttonPreviewStyle, onClick } = props;
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { text, top, left, size, style } = buttonPreviewStyle;
  // const [isOnclick, setIsOnclick] = React.useState(true);
  // const buttonsClick = () => {
  //   window.open(`https://${url}`);
  // };

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
            onClick={onClick}
            // className="bg-pink"
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

export default CustomButtonPreview;
