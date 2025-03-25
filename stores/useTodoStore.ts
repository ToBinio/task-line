import {defineStore} from "pinia";
import type {Todo} from "~/utils/todo";

export const useTodoStore = defineStore('todos', {
    state: (): { data: Todo[] } => ({
        data:
            [
                {
                    title: "huff sagen das er cool ist"
                },
                {
                    title: "huffen"
                },
                {
                    title: "duff"
                },
                {
                    title: "muff"
                }
            ]
    }),
    actions: {
        removeTodo(title: string) {
            const index = this.data.findIndex(value => value.title === title);
            this.data.splice(index, 1);
        }
    }
})