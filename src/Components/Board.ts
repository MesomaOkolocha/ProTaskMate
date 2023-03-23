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
        id: 0,
        name: "To Do",
        tasks: [
          {
            id: nanoid(),
            title: "Task 1",
            description: "This is the first task",
            status: "To Do",
            statusId: 0,
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
            statusId: 0,
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
        id: 1,
        name: "In Progress",
        tasks: [
          {
            id: nanoid(),
            title: "Task 3",
            description: "This is the third task",
            status: "In Progress",
            statusId: 1,
            subtasks: []
          }
        ]
      },
      {
        id: 2,
        name: "Done",
        tasks: [
          {
            id: nanoid(),
            title: "Task 4",
            description: "This is the fourth task",
            status: "Done",
            statusId: 2,
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
  