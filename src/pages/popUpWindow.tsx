import { Button, Card } from '@mui/material';
// import { useState } from 'react';

const PopUpWindow = () => {
  // const [upload, setUpload] = useState(null);

  // const onInputChange = (e: any): void => {
  //   setUpload(e.target.files[0]);
  // };
  // const fileUploadHandler = (e: any): void => {

  // };

  const onSubmit = (e: any): void => {
    e.preventDefault();
  };

  return (
    <Card className="mt-5 flex h-96 w-96 flex-col items-center justify-center">
      <form method="post" onSubmit={onSubmit}>
        <div className="flex h-48 w-64 items-center justify-center">
          <label
            htmlFor="dropzone-file"
            className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                className="mb-3 h-10 w-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>
      </form>
      <div className="flex h-32 w-64 flex-row items-center justify-between">
        <Button className="p-3" variant="contained">
          Cancel
        </Button>
        <Button className="p-3" variant="contained">
          Save
        </Button>
      </div>
    </Card>
  );
};

export default PopUpWindow;
