import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0'
import {action} from "@storybook/addon-actions"
import {Task, TaskPropsType} from "./Task";

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
    task: {id: '1', isDone: true, title: 'JS'},
    todolistId: 'todolistId1'
}

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {id: '2', isDone: false, title: 'CSS'},
    todolistId: 'todolistId2'
}

