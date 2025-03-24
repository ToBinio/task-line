import {defineStore} from "pinia";
import type {Todo} from "~/utils/todo";

export const useTodoStore = defineStore('todos', {
    state: (): { data: Todo[] } => ({
        data:
            [
                {
                    title: "huff schlagen"
                },
                {
                    title: "huffen"
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