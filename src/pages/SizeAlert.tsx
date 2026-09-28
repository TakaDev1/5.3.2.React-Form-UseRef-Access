import React from "react";
import useHnadleSize from "../hooks/useHandleSize";

const SizeAlert = () => {
  const { smallRef, mediumRef, largeRef, handleSubmit } = useHnadleSize();
  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
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
        <button type="submit">確認</button>
      </form>
    </>
  );
};

export default SizeAlert;
