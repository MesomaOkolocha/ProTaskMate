import { BoardType } from "../Types/types";
import { generateId } from "../Functions/Functions";
import {nanoid} from 'nanoid'

export const createBaseBoard = () =>{
  return {
    id: nanoid(),
    name: "Project Board",
    isActive: true,
    columns: [
      {
        id: nanoid(),
        name: "To Do",
        tasks: [
          {
            id: nanoid(),
            title: "Task 1",
            description: "This is the first task",
            status: "To Do",
            statusId: 1,
            subtasks: [
              {
                title: "Subtask 1",
                isCompleted: false,
                id: nanoid()
              },
              {
                title: "Subtask 2",
                isCompleted: false,
                id: nanoid()
              }
            ]
          },
          {
            id: nanoid(),
            title: "Task 2",
            description: "This is the second task",
            status: "To Do",
            statusId: 2,
            subtasks: [
              {
                title: "Subtask 1",
                isCompleted: true,
                id: nanoid()
              },
              {
                title: "Subtask 2",
                isCompleted: false,
                id: nanoid()
              }
            ]
          }
        ]
      },
      {
        id: nanoid(),
        name: "In Progress",
        tasks: [
          {
            id: nanoid(),
            title: "Task 3",
            description: "This is the third task",
            status: "in progress",
            statusId: 2,
            subtasks: []
          }
        ]
      },
      {
        id: nanoid(),
        name: "Done",
        tasks: [
          {
            id: nanoid(),
            title: "Task 4",
            description: "This is the fourth task",
            status: "complete",
            statusId: 3,
            subtasks: [
              {
                title: "Subtask 1",
                isCompleted: true,
                id: nanoid()
              },
              {
                title: "Subtask 2",
                isCompleted: true,
                id: nanoid()
              }
            ]
          }
        ]
      }
    ]
}
}
  