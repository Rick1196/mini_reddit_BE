create table USERS(
     ID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
     EMAIL VARCHAR(50) NOT NULL UNIQUE,
     CREATED_AT TIMESTAMP NOT NULL DEFAULT NOW(),
     UPDATED_AT TIMESTAMP NOT NULL DEFAULT NOW()
);

create table PERMISSIONS(
     ID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
     PERMISSION VARCHAR(30) NOT NULL UNIQUE,
     CREATED_AT TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE USER_PERMISSION(
     ID INT GENERATED ALWAYS AS IDENTITY,
     PERMISSION_ID INT NOT NULL,
     USER_ID INT NOT NULL,
     CONSTRAINT FK_PERMISSION
           FOREIGN KEY(PERMISSION_ID)
               REFERENCES PERMISSIONS(ID),
      CONSTRAINT FK_ID
           FOREIGN KEY(USER_ID)
               REFERENCES USERS(ID)
);

INSERT INTO PERMISSIONS(PERMISSION) VALUES('DEFAULT');
INSERT INTO PERMISSIONS(PERMISSION) VALUES('ADMIN');
