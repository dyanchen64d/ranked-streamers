import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import ListItem from './item'
import rowData from './data';

const getRandomPoints = (): number => {
  return Math.floor(Math.random() * 999);
};

const ListWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const List = styled.div`
  width: 320px;
  min-width: 320px;
  position: relative;
`;

type ItemData = {
  id: string;
  points: number;
}

const RankedStreamers: React.FC = () => {
  const [data, setData] = useState<ItemData[]>([]);
  const [incPt, setIncPt] = useState(0);
  const [incIdx, setIncIdx] = useState(0);
  const intervalCallback = useRef<() => void>();

  const sort = (list: ItemData[]) => {
    return list.sort((a, b) => {
      if (a.points < b.points) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  const updateRowData = useCallback(() => {
    const newData = data.map((d, i) => {
      if (i === incIdx) {
        return {
          id: d.id,
          points: d.points + incPt
        }
      } else {
        return d;
      }
    });
    setData(sort(newData));
  }, [data, incIdx, incPt])

  useEffect(() => {
    const d = rowData.map(rd => ({
      id: rd.id,
      points: getRandomPoints()
    }))
    setData(sort(d));
  }, [])

  useEffect(() => {
    intervalCallback.current = updateRowData;
  }, [updateRowData])

  useEffect(() => {
    const tick = () => {
      intervalCallback.current && intervalCallback.current();
    }
    // timer
    const interval = setInterval(() => {
      setIncPt(99 + Math.floor(Math.random() * 99))
      setIncIdx(Math.floor(Math.random() * rowData.length))
      tick();
    }, 1000);
    return () => clearInterval(interval);
  }, [])

  return (
    <ListWrapper>
      <List>
        {
          rowData.map(item =>
            <ListItem
              key={item.id}
              name={item.name}
              rank={data.findIndex(d => d.id === item.id) + 1}
              url={item.avator}
              points={data.filter(d => d.id === item.id)[0]?.points}
              positionTop={data.findIndex(d => d.id === item.id) * 48}
            />
          )
        }
      </List>
    </ListWrapper>
  )
}

export default RankedStreamers;
