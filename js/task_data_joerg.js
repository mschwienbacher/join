let categories = ['Backoffice', 'Design', 'Marketing', 'Media', 'Sales'];

let assignedTo = [];

let subtasks =[];

let tasksToDo = [
    {
        category: "Design",
        titel: "website redesign",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        inCharge: ["Jörg Betz", "Michael Schwienbacher", "Tim Mellentin"],
        dueDate: ["2023-04-30"],
        priority: "assets/img/low.svg",
        subtasks: ["subtask1", "subtask2"],
        alreadyDone: 1,
    },
    {
        category: "Sales",
        titel: "analyse sales",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        inCharge: ["Jörg Betz", "Michael Schwienbacher", "Tim Mellentin"],
        dueDate: ["2023-04-30"],
        priority: "assets/img/urgent.svg",
        subtasks: ["subtask1", "subtask2"],
        alreadyDone: 1,
    }
]

let tasksInProgress = [
    {
        category: "Backoffice",
        titel: "check ads",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        inCharge: ["Jörg Betz", "Michael Schwienbacher", "Tim Mellentin"],
        dueDate: ["2023-04-30"],
        priority: "assets/img/low.svg",
        subtasks: ["subtask1", "subtask2"],
        alreadyDone: 1,
    },
    {
        category: "Media",
        titel: "Video cut",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        inCharge: ["Jörg Betz", "Michael Schwienbacher", "Tim Mellentin"],
        dueDate: ["2023-04-30"],
        priority: "assets/img/low.svg",
        subtasks: ["subtask1", "subtask2"],
        alreadyDone: 0,
    }
]

let tasksAwaitFeedback = [
    {
        category: "Marketing",
        titel: "order ads",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        inCharge: ["Jörg Betz", "Michael Schwienbacher", "Tim Mellentin"],
        dueDate: ["2023-04-30"],
        priority: "assets/img/low.svg",
        subtasks: ["subtask1", "subtask2"],
        alreadyDone: 1,
    },
    {
        category: "Design",
        titel: "Design logo",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        inCharge: ["Jörg Betz", "Michael Schwienbacher", "Tim Mellentin"],
        dueDate: ["2023-04-30"],
        priority: "assets/img/low.svg",
        subtasks: ["subtask1", "subtask2"],
        alreadyDone: 1,
    }
]

let tasksDone = [
    {
        category: "Marketing",
        titel: "book ads",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        inCharge: ["Jörg Betz", "Michael Schwienbacher", "Tim Mellentin"],
        dueDate: ["2023-04-30"],
        priority: "assets/img/low.svg",
        subtasks: ["subtask1", "subtask2"],
        alreadyDone: 2,
    },
    {
        category: "Backoffice",
        titel: "analyse applications",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        inCharge: ["Jörg Betz", "Michael Schwienbacher", "Tim Mellentin"],
        dueDate: ["2023-04-30"],
        priority: "assets/img/medium.svg",
        subtasks: ["subtask1", "subtask2"],
        alreadyDone: 1,
    }
];