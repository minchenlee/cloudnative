import FeatherIcon from 'feather-icons-react';

function TimeDirection() {
  return (
    <div className="flex flex-col items-center gap-4 text-sm font-medium text-dark-gray bg-white border-solid border-gray border-1 rounded-full px-3 pt-2 pb-4 shadow-[0px_2px_5px_2px_rgba(0,0,0,0.1)]">
      <FeatherIcon icon="info" width="26" height="26" strokeWidth="3"/>
      <p>上午</p>
      <p>下午</p>
      <p>晚上</p>
    </div>
  )
}

export default TimeDirection;
