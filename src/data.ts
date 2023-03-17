import { nanoid } from "nanoid";
import { allboardsType } from "./Types/types";

const defaultBoard: allboardsType = [{
    id: 0,
    name: "Platform Launch",
    isActive: true,
    columns: [{
        id: 0,
        name: "Todo",
        tasks: [{
            id: 0,
            title: "Build UI for onboarding flow",
            description: "",
            status: "Todo",
            statusId: 0,
            subtasks: [{
                title: "Sign up page",
                isCompleted: !0,
                id: nanoid()
            }, {
                title: "Sign in page",
                isCompleted: !1,
                id: nanoid()
            }, {
                title: "Welcome page",
                isCompleted: !1,
                id: nanoid()
            }]
        }, {
            id: 1,
            title: "Build UI for search",
            description: "",
            status: "Todo",
            statusId: 0,
            subtasks: [{
                title: "Search page",
                isCompleted: !1,
                id: nanoid()
            }]
        }, {
            id: 2,
            title: "Build settings UI",
            description: "",
            status: "Todo",
            statusId: 0,
            subtasks: [{
                title: "Account page",
                isCompleted: !1,
                id: nanoid()
            }, {
                title: "Billing page",
                isCompleted: !1,
                id: nanoid()
            }]
        }, {
            id: 3,
            title: "QA and test all major user journeys",
            description: "Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.",
            status: "Todo",
            statusId: 0,
            subtasks: [{
                title: "Internal testing",
                isCompleted: !1,
                id: nanoid()
            }, {
                title: "External testing",
                isCompleted: !1,
                id: nanoid()
            }]
        }]
    }, {
        id: 1,
        name: "Doing",
        tasks: [{
            id: 4,
            title: "Design settings and search pages",
            description: "",
            status: "Doing",
            statusId: 1,
            subtasks: [{
                title: "Settings - Account page",
                isCompleted: !0,
                id: nanoid()
            }, {
                title: "Settings - Billing page",
                isCompleted: !0,
                id: nanoid()
            }, {
                title: "Search page",
                isCompleted: !1,
                id: nanoid()
            }]
        }, {
            id: 5,
            title: "Add account management endpoints",
            description: "",
            status: "Doing",
            statusId: 1,
            subtasks: [{
                title: "Upgrade plan",
                isCompleted: !0,
                id: nanoid()
            }, {
                title: "Cancel plan",
                isCompleted: !0,
                id: nanoid()
            }, {
                title: "Update payment method",
                isCompleted: !1,
                id: nanoid()
            }]
        }, {
            id: 6,
            title: "Design onboarding flow",
            description: "",
            status: "Doing",
            statusId: 1,
            subtasks: [{
                title: "Sign up page",
                isCompleted: !0,
                id: nanoid()
            }, {
                title: "Sign in page",
                isCompleted: !1,
                id: nanoid()
            }, {
                title: "Welcome page",
                isCompleted: !1,
                id: nanoid()
            }]
        }, {
            id: 7,
            title: "Add search enpoints",
            description: "",
            status: "Doing",
            statusId: 1,
            subtasks: [{
                title: "Add search endpoint",
                isCompleted: !0,
                id: nanoid()
            }, {
                title: "Define search filters",
                isCompleted: !1,
                id: nanoid()
            }]
        }, {
            id: 8,
            title: "Add authentication endpoints",
            description: "",
            status: "Doing",
            statusId: 1,
            subtasks: [{
                title: "Define user model",
                isCompleted: !0,
                id: nanoid()
            }, {
                title: "Add auth endpoints",
                isCompleted: !1,
                id: nanoid()
            }]
        }, {
            id: 9,
            title: "Research pricing points of various competitors and trial different business models",
            description: "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
            status: "Doing",
            statusId: 1,
            subtasks: [{
                title: "Research competitor pricing and business models",
                isCompleted: !0,
                id: nanoid()
            }, {
                title: "Outline a business model that works for our solution",
                isCompleted: !1,
                id: nanoid()
            }, {
                title: "Talk to potential customers about our proposed solution and ask for fair price expectancy",
                isCompleted: !1,
                id: nanoid()
            }]
        }]
    }, {
        id: 2,
        name: "Done",
        tasks: [{
            id: 10,
            title: "Conduct 5 wireframe tests",
            description: "Ensure the layout continues to make sense and we have strong buy-in from potential users.",
            status: "Done",
            statusId: 2,
            subtasks: [{
                title: "Complete 5 wireframe prototype tests",
                isCompleted: !0,
                id: nanoid()
            }]
        }, {
            id: 11,
            title: "Create wireframe prototype",
            description: "Create a greyscale clickable wireframe prototype to test our asssumptions so far.",
            status: "Done",
            statusId: 2,
            subtasks: [{
                title: "Create clickable wireframe prototype in Balsamiq",
                isCompleted: !0,
                id: nanoid()
            }]
        }, {
            id: 12,
            title: "Review results of usability tests and iterate",
            description: "Keep iterating through the subtasks until we're clear on the core concepts for the app.",
            status: "Done",
            statusId: 2,
            subtasks: [{
                title: "Meet to review notes from previous tests and plan changes",
                isCompleted: !0,
                id: nanoid()
            }, {
                title: "Make changes to paper prototypes",
                isCompleted: !0,
                id: nanoid()
            }, {
                title: "Conduct 5 usability tests",
                isCompleted: !0,
                id: nanoid()
            }]
        }, {
            id: 13,
            title: "Create paper prototypes and conduct 10 usability tests with potential customers",
            description: "",
            status: "Done",
            statusId: 2,
            subtasks: [{
                title: "Create paper prototypes for version one",
                isCompleted: !0,
                id: nanoid()
            }, {
                title: "Complete 10 usability tests",
                isCompleted: !0,
                id: nanoid()
            }]
        }, {
            id: 14,
            title: "Market discovery",
            description: "We need to define and refine our core product. Interviews will help us learn common pain points and help us define the strongest MVP.",
            status: "Done",
            statusId: 2,
            subtasks: [{
                title: "Interview 10 prospective customers",
                isCompleted: !0,
                id: nanoid()
            }]
        }, {
            id: 15,
            title: "Competitor analysis",
            description: "",
            status: "Done",
            statusId: 2,
            subtasks: [{
                title: "Find direct and indirect competitors",
                isCompleted: !0,
                id: nanoid()
            }, {
                title: "SWOT analysis for each competitor",
                isCompleted: !0,
                id: nanoid()
            }]
        }, {
            id: 16,
            title: "Research the market",
            description: "We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.",
            status: "Done",
            statusId: 2,
            subtasks: [{
                title: "Write up research analysis",
                isCompleted: !0,
                id: nanoid()
            }, {
                title: "Calculate TAM",
                isCompleted: !0,
                id: nanoid()
            }]
        }]
    }]
}, {
    id: 1,
    name: "Marketing Plan",
    isActive: false,
    columns: [{
        id: 0,
        name: "Todo",
        tasks: [{
            id: 17,
            title: "Plan Product Hunt launch",
            description: "11",
            status: "Todo",
            statusId: 0,
            subtasks: [{
                title: "Find hunter",
                isCompleted: !1,
                id: nanoid()
            }, {
                title: "Gather assets",
                isCompleted: !1,
                id: nanoid()
            }, {
                title: "Draft product page",
                isCompleted: !1,
                id: nanoid()
            }, {
                title: "Notify customers",
                isCompleted: !1,
                id: nanoid()
            }, {
                title: "Notify network",
                isCompleted: !1,
                id: nanoid()
            }, {
                title: "Launch!",
                isCompleted: !1,
                id: nanoid()
            }]
        }, {
            id: 18,
            title: "Share on Show HN",
            description: "",
            status: "Todo",
            statusId: 0,
            subtasks: [{
                title: "Draft out HN post",
                isCompleted: !1,
                id: nanoid()
            }, {
                title: "Get feedback and refine",
                isCompleted: !1,
                id: nanoid()
            }, {
                title: "Publish post",
                isCompleted: !1,
                id: nanoid()
            }]
        }, {
            id: 19,
            title: "Write launch article to publish on multiple channels",
            description: "",
            status: "Todo",
            statusId: 0,
            subtasks: [{
                title: "Write article",
                isCompleted: !1,
                id: nanoid()
            }, {
                title: "Publish on LinkedIn",
                isCompleted: !1,
                id: nanoid()
            }, {
                title: "Publish on Inndie Hackers",
                isCompleted: !1,
                id: nanoid()
            }, {
                title: "Publish on Medium",
                isCompleted: !1,
                id: nanoid()
            }]
        }]
    }, {
        id: 1,
        name: "Doing",
        tasks: []
    }]
}, {
    id: 2,
    name: "Roadmap",
    isActive: false,
    columns: [{
        name: "Now",
        id: 0,
        tasks: [{
            id: 20,
            title: "Launch version one",
            description: "",
            status: "Now",
            statusId: 0,
            subtasks: [{
                title: "Launch privately to our waitlist",
                isCompleted: !1,
                id: nanoid()
            }, {
                title: "Launch publicly on PH, HN, etc.",
                isCompleted: !1,
                id: nanoid()
            }]
        }, {
            id: 21,
            title: "Review early feedback and plan next steps for roadmap",
            description: "Beyond the initial launch, we're keeping the initial roadmap completely empty. This meeting will help us plan out our next steps based on actual customer feedback.",
            status: "Now",
            statusId: 0,
            subtasks: [{
                title: "Interview 10 customers",
                isCompleted: !1,
                id: nanoid()
            }, {
                title: "Review common customer pain points and suggestions",
                isCompleted: !1,
                id: nanoid()
            }, {
                title: "Outline next steps for our roadmap",
                isCompleted: !1,
                id: nanoid()
            }]
        }]
    }, {
        id: 1,
        name: "Next",
        tasks: []
    }, {
        id: 2,
        name: "Later",
        tasks: []
    }]
}];
var allBoards = {
    boards: defaultBoard
};

export { defaultBoard, allBoards }