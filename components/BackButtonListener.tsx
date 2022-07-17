import { FC, useEffect, useState } from 'react'

export const BackButtonListener: FC = ({ children }) => {

  const [pressed, setPressed] = useState(false)
  const [pressedCount, setPressedCount] = useState(0)
  const state = { 'page_id': 1 }
  const title = ''
  const url = ''

  useEffect(() => {
    console.log(1234567)
    history.pushState(state, title, url)
    window.onpopstate = e => {
      setPressed(true)
      setPressedCount(pressedCount + 1)
      console.log(5555)
      history.pushState(state, title, url)
    };
  });

  return (
    <>
      {/* <h3>Back button: {pressed.toString()} - Count: {pressedCount}</h3> */}
    </>
  );
};