import { UsersService } from "./users.service";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(skip: string, id: string): Promise<{
        usersData: import("../models/main.models").UserPreview[];
        length: number;
    }>;
    getUser(id: string): Promise<{
        posts: import("../schemas/post.schema").PostDocument[];
        length: number;
        toString(): string;
        toLocaleString(): string;
        pop(): import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        push(...items: (import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[]): number;
        concat(...items: ConcatArray<import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }>[]): (import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        concat(...items: ((import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }) | ConcatArray<import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }>)[]): (import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        join(separator?: string): string;
        reverse(): (import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        shift(): import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        slice(start?: number, end?: number): (import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        sort(compareFn?: (a: import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, b: import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }) => number): (import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        splice(start: number, deleteCount?: number): (import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        splice(start: number, deleteCount: number, ...items: (import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[]): (import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        unshift(...items: (import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[]): number;
        indexOf(searchElement: import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, fromIndex?: number): number;
        lastIndexOf(searchElement: import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, fromIndex?: number): number;
        every<S extends import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }>(predicate: (value: import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, index: number, array: (import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[]) => value is S, thisArg?: any): this is S[];
        every(predicate: (value: import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, index: number, array: (import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[]) => unknown, thisArg?: any): boolean;
        some(predicate: (value: import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, index: number, array: (import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[]) => unknown, thisArg?: any): boolean;
        forEach(callbackfn: (value: import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, index: number, array: (import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[]) => void, thisArg?: any): void;
        map<U>(callbackfn: (value: import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, index: number, array: (import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[]) => U, thisArg?: any): U[];
        filter<S_1 extends import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }>(predicate: (value: import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, index: number, array: (import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[]) => value is S_1, thisArg?: any): S_1[];
        filter(predicate: (value: import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, index: number, array: (import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[]) => unknown, thisArg?: any): (import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        reduce(callbackfn: (previousValue: import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, currentValue: import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, currentIndex: number, array: (import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[]) => import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }): import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        reduce(callbackfn: (previousValue: import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, currentValue: import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, currentIndex: number, array: (import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[]) => import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, initialValue: import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }): import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        reduce<U_1>(callbackfn: (previousValue: U_1, currentValue: import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, currentIndex: number, array: (import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[]) => U_1, initialValue: U_1): U_1;
        reduceRight(callbackfn: (previousValue: import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, currentValue: import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, currentIndex: number, array: (import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[]) => import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }): import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        reduceRight(callbackfn: (previousValue: import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, currentValue: import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, currentIndex: number, array: (import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[]) => import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, initialValue: import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }): import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        reduceRight<U_2>(callbackfn: (previousValue: U_2, currentValue: import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, currentIndex: number, array: (import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[]) => U_2, initialValue: U_2): U_2;
        find<S_2 extends import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }>(predicate: (this: void, value: import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, index: number, obj: (import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[]) => value is S_2, thisArg?: any): S_2;
        find(predicate: (value: import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, index: number, obj: (import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[]) => unknown, thisArg?: any): import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        findIndex(predicate: (value: import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, index: number, obj: (import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[]) => unknown, thisArg?: any): number;
        fill(value: import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, start?: number, end?: number): (import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        copyWithin(target: number, start: number, end?: number): (import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        entries(): IterableIterator<[number, import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }]>;
        keys(): IterableIterator<number>;
        values(): IterableIterator<import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        includes(searchElement: import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, fromIndex?: number): boolean;
        flatMap<U_3, This = undefined>(callback: (this: This, value: import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, index: number, array: (import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[]) => U_3 | readonly U_3[], thisArg?: This): U_3[];
        flat<A, D extends number = 1>(this: A, depth?: D): FlatArray<A, D>[];
        [Symbol.iterator](): IterableIterator<import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        [Symbol.unscopables](): {
            copyWithin: boolean;
            entries: boolean;
            fill: boolean;
            find: boolean;
            findIndex: boolean;
            keys: boolean;
            values: boolean;
        };
        at(index: number): import("../schemas/subscriptions.schema").Subscriptions & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        userId: string;
        name: string;
        location: string;
        banner: string;
        avatar: string;
        aboutMe: string;
        skills: string;
        hobbies: string;
        _id?: any;
        __v?: any;
        $locals: Record<string, unknown>;
        $op: "remove" | "save" | "validate";
        $where: Record<string, unknown>;
        baseModelName?: string;
        collection: import("mongoose").Collection<import("bson").Document>;
        db: import("mongoose").Connection;
        errors?: import("mongoose").Error.ValidationError;
        id?: any;
        isNew: boolean;
        modelName: string;
        schema: import("mongoose").Schema<any, import("mongoose").Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
            [x: string]: any;
        }>;
    }>;
}
