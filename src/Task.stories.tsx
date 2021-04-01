import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0'
import {action} from "@storybook/addon-actions"
import {Task, TaskPropsType} from "./Task";
import {v1} from "uuid";

export default {
    title: 'Todolist/Task',
    component: Task
} as Meta

const onChangeCheckboxHandler = action('Status changed inside Task')
const onChangeTitleHandler = action('Status changed inside Task')
const onClickHandler = action('Status changed inside Task')


const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

const baseArgs = {
    changeTaskStatus: onChangeCheckboxHandler,
    changeTaskTitle: onChangeTitleHandler,
    removeTask: onClickHandler
}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArgs,
    task: {id: '1', title: 'JS', addedDate: '',order: 0,
        description: '', status: 0, priority: 0, startDate: '', deadline: '', todoListId: ''},
    todolistId: 'todolistId1'
}

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {id: '2', title: 'CSS', addedDate: '',order: 0,
        description: '', status: 0, priority: 0, startDate: '', deadline: '', todoListId: ''},
    todolistId: 'todolistId2'
}

