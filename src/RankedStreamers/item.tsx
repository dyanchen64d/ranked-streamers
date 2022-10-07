import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Item = styled.div<{ top: number }>`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  position: absolute;
  top: ${props => props.top}px;
  left: 0;
  transition: all 0.3s ease 0s;
`

const RankNumber = styled.div`
  width: 24px;
  text-align: center;
`

const Avator = styled.div<{ url: string }>`
  background-image: url(${props => props.url});
  width: 36px;
  height: 36px;
  background-size: 100%;
  border-radius: 18px;
  border: 2px solid rgb(255, 255, 255);
  box-sizing: border-box;
`;

const Name = styled.div``;

const Points = styled.div`
  text-align: right;
  flex-grow: 1;
  color: ${props => props.color};
  font-weight: ${props => props.color === 'red' ? '600' : '300'};
`

type Props = {
  name: string;
  rank: number;
  url: string;
  points: number;
  positionTop: number;
}

const ListItem: React.FC<Props> = (props) => {
  const { name, rank, url, points, positionTop } = props;

  const [curr, setCurr] = useState<number | undefined>(undefined);

  const [prev, setPrev] = useState<number | undefined>(undefined);

  const [count, setCount] = useState<number | undefined>(undefined);

  const [fontColor, setFontColor] = useState('black');

  const tid = useRef<number | null>(null);

  const updateCountRef = useRef<() => void>();

  useEffect(() => {
    setCurr((prev) => {
      setPrev(prev);
      return points;
    })
  }, [points])

  // init count
  useEffect(() => {
    if (!prev) {
      setCount(points);
    } else {
      setCount(prev)
    }
  }, [prev, points]);

  const updateCount = useCallback(() => {
    if (count === points && tid.current) {
      setFontColor('black')
      clearInterval(tid.current);
    } else {
      setFontColor('green')
      count && setCount(v => (v as number) + 1);
    }
  }, [count, points])

  useEffect(() => {
    updateCountRef.current = updateCount
  }, [updateCount])

  // interval
  useEffect(() => {
    if (tid.current) {
      clearInterval(tid.current);
    };

    if (points) {
      tid.current = window.setInterval(() => {
        updateCountRef.current && updateCountRef.current()
      }, 2);
    }
  }, [points])

  return (
    <Item top={positionTop}>
      <RankNumber>{rank}</RankNumber>
      <Avator url={url} />
      <Name>{name}</Name>
      <Points color={fontColor}>{count}pt</Points>
    </Item>
  )
}

export default ListItem;
