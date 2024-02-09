/**Problem Statement : To Implement Linked list operations like InsertionFromEnd,
 * insertAtPosition,deletionFromEnd, traversal,length, search.
*/

/**
 * Represents a node in the linked list.
 */
class Node {
    /**
     * Creates a new node with the given value.
     * @param {*} value - The value to be stored in the node.
     * @throws {Error} If the value is undefined.
     */
    constructor(value) {
        if (value === undefined) {
            throw new Error("Node value cannot be undefined");
        }
        this.next = null;
        this.value = value;
    }
}

/**
 * Represents a singly linked list.
 */
class LinkedList {
    constructor() {
        /**
         * The head of the linked list.
         * @type {Node}
         */
        this.head = null;
        /**
         * The length of the linked list.
         * @type {number}
         */
        this.length = 0;
    }

    /**
     * Traverses the linked list and prints its elements.
     */
    traverse() {
        let current = this.head;
        let result = '';
        while (current) {
            result += current.value + ' ';
            current = current.next;
        }
        console.log(result);
    }

    /**
     * Returns the length of the linked list.
     * @returns {number} The length of the linked list.
     */
    length() {
        return this.length;
    }

    /**
     * Searches for a value in the linked list.
     * @param {*} value - The value to search for.
     * @returns {string} A message indicating whether the value was found or not.
     */
    search(value) {
        let current = this.head;
        while (current) {
            if (current.value === value) {
                return value + " found";
            }
            current = current.next;
        }
        return value + " not found";
    }

    /**
     * Inserts a value into the linked list at the specified position.
     * If no position is provided, the value is inserted at the end of the list.
     * @param {*} value - The value to be inserted.
     * @param {number} [position=null] - The position at which to insert the value.
     */
    insert(value, position = null) {
        let newNode = new Node(value);

        if (!this.head) {
            this.head = newNode;
            this.length++;
            return;
        }

        if (position === null || position >= this.length) {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        } else if (position === 0) {
            newNode.next = this.head;
            this.head = newNode;
        } else {
            let current = this.head;
            let count = 0;
            while (count < position - 1) {
                current = current.next;
                count++;
            }
            newNode.next = current.next;
            current.next = newNode;
        }
        this.length++;
    }

    /**
     * Deletes the first occurrence of the specified value from the linked list.
     * @param {*} value - The value to be deleted.
     */
    delete(value) {
        if (!this.head) {
            console.log("List is empty");
            return;
        }

        if (this.head.value === value) {
            this.head = this.head.next;
            this.length--;
            return;
        }

        let current = this.head;
        let prev = null;
        while (current && current.value !== value) {
            prev = current;
            current = current.next;
        }

        if (!current) {
            console.log(value + " not found in the list");
            return;
        }

        prev.next = current.next;
        this.length--;
    }
}

// Example usage:
const linkedList = new LinkedList();
linkedList.insert(5);
linkedList.insert(10);
linkedList.insert(15);
linkedList.traverse(); // Output: 5 10 15
console.log(linkedList.search(10)); // Output: 10 found
linkedList.delete(10);
linkedList.traverse(); // Output: 5 15
