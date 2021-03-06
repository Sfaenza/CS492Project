# Migration `20201103175203-create-exercise-types`

This migration has been generated by ncucciniello at 11/3/2020, 12:52:03 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Workout" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,

    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE "Exercise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "workoutId" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "repsAssigned" INTEGER NOT NULL,
    "repsComplete" INTEGER,
    "setsAssigned" INTEGER NOT NULL,
    "setsComplete" INTEGER,
    "exerciseType" INTEGER NOT NULL,

    FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("exerciseType") REFERENCES "ExerciseType"("id") ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE "ExerciseType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201103174903-create-exercises..20201103175203-create-exercise-types
--- datamodel.dml
+++ datamodel.dml
@@ -1,9 +1,9 @@
 datasource DS {
   // optionally set multiple providers
   // example: provider = ["sqlite", "postgresql"]
   provider = "sqlite"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider      = "prisma-client-js"
@@ -36,6 +36,12 @@
   repsComplete Int?
   setsAssigned Int
   setsComplete Int?
   exerciseType Int
-  Workout      Workout  @relation(fields: [workoutId], references: [id])
+  Workout      Workout      @relation(fields: [workoutId], references: [id])
+  ExerciseType ExerciseType @relation(fields: [exerciseType], references: [id])
 }
+
+model ExerciseType {
+  id    Int      @id @default(autoincrement())
+  name  String
+}
```


