// import { render } from '@testing-library/react';
import React from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

import { useAppSelector } from '../../store';

import { NodeTable } from '../../services';
import ChainObj from '../../services/Chain';
import { LeftArrow, RightArrow } from './arrows';
import useDrag from './useDrag';
import { Card } from './Card';

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}
const elemPrefix = '';
const getId = (index: number) => `${elemPrefix}${index}`;

const getItems = () =>
  Array(10)
    .fill(0)
    .map((_, ind) => ({ id: getId(ind) }));

// export default class Chain extends React.Component {
export default function Chain(selectedNode: any) {
  const [searchParams, setSearchParams] = useSearchParams();
  const nodeId = searchParams.get('id');

  const nodes: NodeTable = useAppSelector((state) => state.network.nodes) as NodeTable;

  console.log(selectedNode);
  const getBlocks = () =>
    Array(selectedNode.selectedNode.chain.chain.length)
      .fill(0)
      .map((_, ind) => [selectedNode.selectedNode.chain.chain[ind]]);

  const [nds] = React.useState(getBlocks);
  console.log('Blocks');
  console.log(nds);

  // console.log(selectedNode.selectedNode.chain.chain)

  const [items] = React.useState(getItems);
  // console.log("items")
  // console.log(items)
  const { dragStart, dragStop, dragMove, dragging } = useDrag();
  const handleDrag =
    ({ scrollContainer }: scrollVisibilityApiType) =>
    (ev: React.MouseEvent) =>
      dragMove(ev, (posDiff) => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff;
        }
      });

  const [selected, setSelected] = React.useState<string>('');
  const handleItemClick = (itemId: string) => () => {
    if (dragging) {
      return false;
    }
    setSelected(selected !== itemId ? itemId : '');
    return true;
  };

  return (
    <div className="ChainView">
      <div onMouseLeave={dragStop}>
        <ScrollMenu
          // LeftArrow={LeftArrow}
          // RightArrow={RightArrow}
          onWheel={onWheel}
          onMouseDown={() => dragStart}
          onMouseUp={() => dragStop}
          onMouseMove={handleDrag}
        >
          {nds.map((_, ind) => (
            <Card
              blockBbj={nds[ind]}
              // onClick={handleItemClick('test')}
              // selected={id === selected}
            />
          ))}
          {/* {items.map(({ id }) => (
            <Card
              title={id}
              itemId={id} // NOTE: itemId is required for track items
              key={id}
              obj={selectedNode.selectedNode[0]}
              onClick={handleItemClick(id)}
              selected={id === selected}
            />
          ))} */}
        </ScrollMenu>
      </div>
    </div>
  );
}
