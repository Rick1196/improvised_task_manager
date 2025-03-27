"use client"
import { DragDropContext, Draggable, DraggableLocation, Droppable, type DropResult } from "@hello-pangea/dnd";
import { Card, Text } from "@mantine/core";
import React, { useState } from "react";
import { TicketI } from "../forms/ticket.form";
import { ColumnI } from ".";
import cx from 'clsx';
import classes from './DndList.module.css';

type DNDGridProps = {
  columns: ColumnI[],
  onMove: (ticket: TicketI, target: ColumnI) => void;
};

const reorder = (
  list: TicketI[],
  startIndex: number,
  endIndex: number,
): TicketI[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (
  source: TicketI[],
  destination: TicketI[],
  droppableSource: DraggableLocation<string>,
  droppableDestination: DraggableLocation<string>,
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: { [key: string]: TicketI[] } = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  return result;
};


const DNDGrid: React.FC<DNDGridProps> = ({ columns, onMove }) => {
  const [columnsState, setColumnsState] = useState(columns);
  const onDragEnd = (result: DropResult<string>) => {
    const { source, destination } = result;
    // // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;
    if (sInd === dInd) {
      const items = reorder(columnsState[sInd].items, source.index, destination.index);
      const newState = [...columnsState];
      newState[sInd].items = items;
      setColumnsState(newState);
    } else {
      onMove(columnsState[sInd].items[source.index], columnsState[dInd]);
      const result = move(
        columnsState[sInd].items,
        columnsState[dInd].items,
        source,
        destination,
      );
      const newState = [...columnsState];
      newState[sInd].items = result[sInd];
      newState[dInd].items = result[dInd];
      console.log("debug", columnsState, result, newState);
      setColumnsState(newState);
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd} >
      <Card withBorder radius="md" className={classes.container}>
        {columnsState.map((column, ind) => (
          <Droppable key={ind} droppableId={`${ind}`}>
            {(provided, _snapshot) => (
              <Card
                withBorder
                radius="md"
                className={classes.column}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <Text className={classes.title} fw={500}>
                  {column.title}
                </Text>
                {column.items.map((item, index) => (
                  <Draggable
                    key={`${item.id}`}
                    draggableId={`${item.id}`}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        onClick={() => console.log("open modal")}
                        ref={provided.innerRef}
                        className={cx(classes.item, {
                          [classes.itemDragging]: snapshot.isDragging,
                        })}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Text>{item.title}</Text>
                        <Text className={classes.text}>{item.description}</Text>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Card>
            )}
          </Droppable>
        ))}
      </Card>
    </DragDropContext >
  );
}

export default DNDGrid;
