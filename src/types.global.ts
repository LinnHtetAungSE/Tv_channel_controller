export type Program = {
    id: string;
    name: string;
    img: string;
    duration: string;
}

export type Status = {
    tvId: string;
    channelId: string;
    programId: string;
    status: string;
}

export type Channel = {
    id: string;
    name: string;
    img: string;
    programs: Program[];
}

export type TV = {
    id: string;
    name: string;
    watchingChannel: string;
    watchingProgram: string
}