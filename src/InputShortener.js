import { useState } from "react"

const InputShortener = ({ setInputValue }) => {
  const [value, setValue] = useState("");

  const handleClick = () => {
    setInputValue(value);
    setValue("");
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  }

  return (
    <div>
      <h1 className="text-6xl text-center text-white mb-6 font-bold">
        Link<span className="text-primary">Might</span>
      </h1>
      <div className="flex mb-8">
        <input
          type="text"
          placeholder="Paste a link to shorten it"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full py-2 pl-4 pr-0 text-base border-none outline-none rounded-l-md placeholder:text-sm"
        />
        <button
          onClick={handleClick}
          className="px-4 h-12 text-xs font-bold uppercase text-white bg-primary rounded-r-md font-sans"
        >
          shorten
        </button>
      </div>
    </div>

  )
}

export default InputShortener