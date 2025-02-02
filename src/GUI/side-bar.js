import React, { useRef } from 'react'
import { useStore } from 'effector-react'
import styled from 'styled-components'
import Draggable from 'react-draggable'
import {
  onPlay,
  onStop,
  onRestart,
  onAddSnake,
  $gameStateStore,
  GAME_STATE,
} from '../model'
import { RightPanel } from './right-panel'
import { ControllPanel } from './control-pannel'

export const SideBarWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 300px;
  cursor: move;

  & div {
    box-sizing: border-box;
  }
`

export const SideBarInner = styled.div`
  display: flex;
  position: relative;
  flex: 1 1 auto;
  flex-direction: column;
`

const Button = styled.button`
  border: none;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 5px;
  font-size: 90%;
  cursor: pointer;
  padding: 8px 15px;
  transition: 0.5s;
  outline: none;

  &:hover {
    background: #fff;
  }

  &:disabled {
    background: #fff;
    cursor: not-allowed;
  }
`

export function SideBar() {
  const lastId = useRef(2)
  const gameState = useStore($gameStateStore)
  const isPlay = gameState === GAME_STATE.IS_PLAY
  const playOrPause = isPlay ? onStop : onPlay
  const text = isPlay ? 'pause' : 'play'

  function addSnakeToGame() {
    onAddSnake(`ai-${lastId.current++}`)
  }

  return (
    <Draggable>
      <SideBarWrapper>
        <SideBarInner>
          <RightPanel />
          <ControllPanel>
            <Button onClick={playOrPause}>{text}</Button>
            <Button onClick={onRestart}>restart</Button>
            <Button onClick={addSnakeToGame}>add snake</Button>
          </ControllPanel>
        </SideBarInner>
      </SideBarWrapper>
    </Draggable>
  )
}
