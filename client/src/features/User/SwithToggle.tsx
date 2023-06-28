import { useState } from "react";

const SwitchToggle = ({ text }: { text: string }) => {
  const [checked, setChecked] = useState(false);

  const handleToggle = () => {
    setChecked(!checked);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-900 text-lg font-kanit font-light leading-6">
        {text}
      </span>
      <label className="relative inline-flex items-center cursor-pointer">
        <div className="w-11 h-6 bg-colorBlue peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-colorBlue rounded-full peerpeer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-colorBlue peer-checked:bg-colorBlue"></div>
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={handleToggle}
        />
      </label>
    </div>
  );
};

export default SwitchToggle;
