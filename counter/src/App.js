import { RecoilRoot, useRecoilState, atom, selector, useRecoilValue } from 'recoil'

function App() {
  return (
    <RecoilRoot>
      <TextInput />
      <Counter />
    </RecoilRoot>
  );
}

const textInputstate = atom({
  key: "textInputstate",
  default: ''
})

const textInputSelector = selector({
  key: "textInputSelector",
  get: ({ get }) =>{
    const text = get(textInputstate);

    return text.length;
  }
})

function TextInput() {
  const [text, setText] = useRecoilState(textInputstate);

  const onInputChange = (input) => {
    setText(input.target.value);
  }
  return (
    <div>
      <input value={text} onChange={onInputChange} />
    </div>
  )
}

function Counter() {
  const length = useRecoilValue(textInputSelector);
  return (
    <span>{length}</span>
  )
}

export default App;
