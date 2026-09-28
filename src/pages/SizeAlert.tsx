import React from "react";
import useHnadleSize from "../hooks/useHandleSize";

const SizeAlert = () => {
  const { smallRef, mediumRef, largeRef, handleSubmit } = useHnadleSize();
  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset className="space-x-2 text-white">
          <legend>サイズ</legend>
          <label>
            <input type="radio" name="size" ref={smallRef} />小
          </label>
          <label>
            <input type="radio" name="size" ref={mediumRef} />中
          </label>
          <label>
            <input type="radio" name="size" ref={largeRef} />大
          </label>
        </fieldset>
        <button
          type="submit"
          className="bg-gray-500 my-10 rounded-full text-white w-1/5 py-1 hover:opacity-80 cursor-pointer"
        >
          確認
        </button>
      </form>
    </>
  );
};

export default SizeAlert;
