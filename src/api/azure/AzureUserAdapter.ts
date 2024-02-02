import { User } from "@/types/User";
import { parseNumber } from "@/utils/parsers";
import { isObject } from "@/utils/typeof";
import { AzureBaseAdapter } from "@/api/azure/AzureBaseAdapter";

export class AzureUserAdapter extends AzureBaseAdapter<User> {
    get model() {
        return "User";
    }

    parser(record: unknown): User {
        if (!isObject(record)) throw new Error("Expected an object");
        return {
            id: parseNumber(record.id),
            username: String(record.username),
            email: String(record.email),
            avatarImage: String(record.avatarImage),
        };
    }

    async put(record: User): Promise<void> {
        const url = this.buildUrl();

        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: this.serialize(record),
        });

        this.handleResponse(response);
    }
}