create extension if not exists "uuid-ossp";

create type task_status as enum ('PENDING', 'IN_PROGRESS', 'DONE');

create table if not exists tasks (
    task_id uuid primary key default uuid_generate_v1(),
    title text not null,
    description text not null,
    status task_status not null default 'PENDING',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create or replace function update_ts()
returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

create trigger t_tasks_update_ts before update on tasks for each row
    execute procedure update_ts();