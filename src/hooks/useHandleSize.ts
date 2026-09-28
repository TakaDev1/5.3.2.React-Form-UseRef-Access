import { useRef } from "react";

const useHnadleSize = () => {
  const smallRef = useRef<HTMLInputElement>(null);
  const mediumRef = useRef<HTMLInputElement>(null);
  const largeRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const size = smallRef.current?.checked
      ? "小"
      : mediumRef.current?.checked
        ? "中"
        : largeRef.current?.checked
          ? "大"
          : "";

    if (!size) {
      alert("サイズが選択されてません");
    } else {
      alert(size);
    }
  };

  return { smallRef, mediumRef, largeRef, handleSubmit };
};

export default useHnadleSize;
