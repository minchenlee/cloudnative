function StatusDot(props) {
  const status = props.status || "";
  let color = "";

  if (status == "plenty") {
    color = "bg-white"
  }

  if (status == "some") {
    color = "bg-silver"
  }

  if (status == "none") {
    color = "bg-dark-gray"
  }

  return (
    <div className={`w-[30px] h-[30px] rounded-full ${color} border-1 border-light-silver shadow-[inset_1px_2px_3px_0_rgba(0,0,0,0.4)]`}></div>
  );
}

export default StatusDot;
