const { pgTable, serial, text, varchar, integer, boolean } = require("drizzle-orm/pg-core");

export const Users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: varchar('email').notNull().unique(),
    isSubscribed: boolean('isSubscribed').default(false), // Add subscription field
});

export const JsonForms = pgTable('jsonForms', {
    id: serial('id').primaryKey(),
    jsonform: text('jsonform').notNull(),
    theme: varchar('theme'),
    background: varchar('background'),
    style: varchar('style'),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt').notNull(),
    enabledSignIn: boolean('enabledSignIn').default(false)
});

export const userResponses = pgTable('userResponses', {
    id: serial('id').primaryKey(),
    jsonResponse: text('jsonResponse').notNull(),
    createdBy: varchar('createdBy').default('anonymous'),
    createdAt: varchar('createdAt').notNull(),
    formRef: integer('formRef').references(() => JsonForms.id)
});