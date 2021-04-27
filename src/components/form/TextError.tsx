function TextError(props: any) {
  return (
    <div className="py-1" style={{ color: "red", fontSize: "1rem" }}>
      {props.children}
    </div>
  );
}

export default TextError;
