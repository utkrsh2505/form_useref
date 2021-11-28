import React from "react";
import { useState, useRef, useEffect } from "react";
const Form = () => {
  const [formState, setFormState] = useState({
    name: "",
    gender: "null",
    maritalStatus: false,
    image: null
  });
  const [imageSrc, setImageSrc] = useState(null);
  const imageRef = useRef(null);
  useEffect(() => {
    const file = imageRef.current.files[0];
    let src = null;
    if (file) {
      src = URL.createObjectURL(file);
    }
    setImageSrc(src);
    return () => {
      URL.revokeObjectURL(src);
    };
  }, [formState.image]);
  const handleFormUpdate = (e) => {
    let { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormState({
      ...formState,
      [name]: val
    });
  };
  const handleFile = (e) => {
    const file = e.target.files[0];
    setFormState({
      ...formState,
      image: file
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={formState.name}
            onChange={handleFormUpdate}
          />
        </div>
        <div>
          <select
            value={formState.gender}
            onChange={handleFormUpdate}
            name="gender"
          >
            <option value="">Selelct Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
        <div>
          <label>Marital Status</label>
          <input
            type="checkbox"
            name="maritalStatus"
            onChange={handleFormUpdate}
            checked={formState.maritalStatus}
          />
        </div>
        <div>
          <input type="file" ref={imageRef} onChange={handleFile} />
        </div>
        <input type="submit" />
        {imageSrc && (
          <img src={imageSrc} style={{ width: "200px", height: "200px" }} />
        )}
      </form>
    </>
  );
};
export default Form;
