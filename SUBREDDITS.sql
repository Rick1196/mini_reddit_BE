create table SUBREDDITS(
    ID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    TITLE VARCHAR(50) NOT NULL UNIQUE,
    CREATED_AT TIMESTAMP NOT NULL DEFAULT NOW(),
    UPDATED_AT TIMESTAMP NOT NULL DEFAULT NOW(),
    IS_NSFW BOOLEAN,
    IS_PRIVATE BOOLEAN,
    IS_PUBLIC BOOLEAN,
    SUBREDDIT_OWNER_ID INT NOT NULL,
    CONSTRAINT FK_SUBREDDIT_OWNER FOREIGN KEY(SUBREDDIT_OWNER_ID) REFERENCES USERS(ID)
);

CREATE TABLE POSTS(
    ID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    TITLE VARCHAR(360),
    CREATED_AT TIMESTAMP NOT NULL DEFAULT NOW(),
    UPDATED_AT TIMESTAMP NOT NULL DEFAULT NOW(),
    IS_EDITED BOOLEAN DEFAULT FALSE,
    CONTENT TEXT,
    UP_VOTES BIGINT,
    DOWN_VOTES BIGINT,
    POST_OWNER_ID INT NOT NULL,
    POST_SUBREDDIT_ID INT NOT NULL,
    CONSTRAINT FK_POST_OWNER FOREIGN KEY(POST_OWNER_ID) REFERENCES USERS(ID),
    CONSTRAINT FK_POST_SUBREDDIT FOREIGN KEY(POST_SUBREDDIT_ID) REFERENCES SUBREDDITS(ID)
);

CREATE TABLE COMMENTS(
    ID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    CREATED_AT TIMESTAMP NOT NULL DEFAULT NOW(),
    UPDATED_AT TIMESTAMP NOT NULL DEFAULT NOW(),
    IS_EDITED BOOLEAN DEFAULT FALSE,
    CONTENT TEXT,
    UP_VOTES BIGINT,
    DOWN_VOTES BIGINT,
    OWNER_ID INT NOT NULL,
    COMMENT_OWNER_ID INT NOT NULL,
    COMMENT_POST_ID INT NOT NULL,
    CONSTRAINT FK_COMMENT_POST FOREIGN KEY(COMMENT_POST_ID) REFERENCES POSTS(ID)
);

