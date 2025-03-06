/* eslint-disable react/prop-types */

const CustomButton = ({ title }) => {
  return (
    <>
      <button className="bg-red-600 p-[1rem] text-white border-none rounded-2xl text-xl">
        {title}
      </button>
    </>
  );
};

export default CustomButton;
