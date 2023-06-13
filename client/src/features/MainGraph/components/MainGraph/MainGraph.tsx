import React from 'react'
import useGraph from '@/features/MainGraph/hooks/useGraph'
import Graph from '@/features/MainGraph/components/Graph'

type MainGraphProps = {
  openCard: boolean;
  setOpenCard: (value: boolean) => void;
};


function MainGraph(props:MainGraphProps){
  const [data] = useGraph()

  if(data) {
    return <Graph data={data} {...props}/>
  }

  return null
}

export default MainGraph