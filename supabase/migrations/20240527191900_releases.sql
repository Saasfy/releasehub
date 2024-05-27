create table "public"."releases" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "notes" text not null,
    "release_date" date not null,
    "project_id" uuid not null
);


alter table "public"."releases" enable row level security;

alter table "public"."projects" add column "domain_id" uuid;

alter table "public"."projects" add column "github" text;

alter table "public"."projects" add column "primary_color" text not null default '240 5.9% 10%'::text;

alter table "public"."projects" add column "site" text;

CREATE UNIQUE INDEX releases_pkey ON public.releases USING btree (id);

alter table "public"."releases" add constraint "releases_pkey" PRIMARY KEY using index "releases_pkey";

alter table "public"."projects" add constraint "public_projects_domain_id_fkey" FOREIGN KEY (domain_id) REFERENCES domains(id) not valid;

alter table "public"."projects" validate constraint "public_projects_domain_id_fkey";

alter table "public"."releases" add constraint "public_releases_project_fkey" FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE not valid;

alter table "public"."releases" validate constraint "public_releases_project_fkey";

grant delete on table "public"."releases" to "anon";

grant insert on table "public"."releases" to "anon";

grant references on table "public"."releases" to "anon";

grant select on table "public"."releases" to "anon";

grant trigger on table "public"."releases" to "anon";

grant truncate on table "public"."releases" to "anon";

grant update on table "public"."releases" to "anon";

grant delete on table "public"."releases" to "authenticated";

grant insert on table "public"."releases" to "authenticated";

grant references on table "public"."releases" to "authenticated";

grant select on table "public"."releases" to "authenticated";

grant trigger on table "public"."releases" to "authenticated";

grant truncate on table "public"."releases" to "authenticated";

grant update on table "public"."releases" to "authenticated";

grant delete on table "public"."releases" to "service_role";

grant insert on table "public"."releases" to "service_role";

grant references on table "public"."releases" to "service_role";

grant select on table "public"."releases" to "service_role";

grant trigger on table "public"."releases" to "service_role";

grant truncate on table "public"."releases" to "service_role";

grant update on table "public"."releases" to "service_role";



