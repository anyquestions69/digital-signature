--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3 (Homebrew)
-- Dumped by pg_dump version 16.3

-- Started on 2024-09-18 23:25:13 MSK

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE IF EXISTS postgres;
--
-- TOC entry 3699 (class 1262 OID 5)
-- Name: postgres; Type: DATABASE; Schema: -; Owner: public_hysteria
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';


ALTER DATABASE postgres OWNER TO public_hysteria;

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3700 (class 0 OID 0)
-- Dependencies: 3699
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: public_hysteria
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- TOC entry 5 (class 2615 OID 34604)
-- Name: public; Type: SCHEMA; Schema: -; Owner: public_hysteria
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO public_hysteria;

--
-- TOC entry 3701 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: public_hysteria
--

COMMENT ON SCHEMA public IS '';


--
-- TOC entry 848 (class 1247 OID 34615)
-- Name: Role; Type: TYPE; Schema: public; Owner: public_hysteria
--

CREATE TYPE public."Role" AS ENUM (
    'Admin',
    'Guest'
);


ALTER TYPE public."Role" OWNER TO public_hysteria;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 34629)
-- Name: Post; Type: TABLE; Schema: public; Owner: public_hysteria
--

CREATE TABLE public."Post" (
    id integer NOT NULL,
    title text NOT NULL,
    filename text NOT NULL,
    hash text NOT NULL,
    delivered boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Post" OWNER TO public_hysteria;

--
-- TOC entry 218 (class 1259 OID 34628)
-- Name: Post_id_seq; Type: SEQUENCE; Schema: public; Owner: public_hysteria
--

CREATE SEQUENCE public."Post_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Post_id_seq" OWNER TO public_hysteria;

--
-- TOC entry 3703 (class 0 OID 0)
-- Dependencies: 218
-- Name: Post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: public_hysteria
--

ALTER SEQUENCE public."Post_id_seq" OWNED BY public."Post".id;


--
-- TOC entry 220 (class 1259 OID 34637)
-- Name: Signature; Type: TABLE; Schema: public; Owner: public_hysteria
--

CREATE TABLE public."Signature" (
    "postId" integer NOT NULL,
    "userId" integer NOT NULL,
    "assignedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    hash text NOT NULL
);


ALTER TABLE public."Signature" OWNER TO public_hysteria;

--
-- TOC entry 217 (class 1259 OID 34620)
-- Name: User; Type: TABLE; Schema: public; Owner: public_hysteria
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    phone text NOT NULL,
    name text NOT NULL,
    role public."Role" DEFAULT 'Guest'::public."Role" NOT NULL,
    password text NOT NULL
);


ALTER TABLE public."User" OWNER TO public_hysteria;

--
-- TOC entry 216 (class 1259 OID 34619)
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: public_hysteria
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO public_hysteria;

--
-- TOC entry 3704 (class 0 OID 0)
-- Dependencies: 216
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: public_hysteria
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- TOC entry 215 (class 1259 OID 34605)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: public_hysteria
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO public_hysteria;

--
-- TOC entry 3531 (class 2604 OID 34632)
-- Name: Post id; Type: DEFAULT; Schema: public; Owner: public_hysteria
--

ALTER TABLE ONLY public."Post" ALTER COLUMN id SET DEFAULT nextval('public."Post_id_seq"'::regclass);


--
-- TOC entry 3529 (class 2604 OID 34623)
-- Name: User id; Type: DEFAULT; Schema: public; Owner: public_hysteria
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- TOC entry 3692 (class 0 OID 34629)
-- Dependencies: 219
-- Data for Name: Post; Type: TABLE DATA; Schema: public; Owner: public_hysteria
--



--
-- TOC entry 3693 (class 0 OID 34637)
-- Dependencies: 220
-- Data for Name: Signature; Type: TABLE DATA; Schema: public; Owner: public_hysteria
--



--
-- TOC entry 3690 (class 0 OID 34620)
-- Dependencies: 217
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: public_hysteria
--

INSERT INTO public."User" (id, phone, name, role, password) VALUES (1, '89811066969', 'Тыренко Даниил Вадимович', 'Admin', '$2b$10$N867BfZTNs0s3df9X6IMKOJDCbH0CPU74GXreypkF.pLZ/FodRUKm') ON CONFLICT DO NOTHING;


--
-- TOC entry 3688 (class 0 OID 34605)
-- Dependencies: 215
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: public_hysteria
--

INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('5b50f3d4-50c7-4d34-a68f-e19a32d682b4', '49bac43b0fae3922672a3b4c9a2e606341cecf9747422fb3b0304aa35bd9ffaf', '2024-07-07 23:51:31.149726+03', '20240705094352_init', NULL, NULL, '2024-07-07 23:51:31.120885+03', 1) ON CONFLICT DO NOTHING;
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('52e98784-5be0-4f5d-83bd-4632264f3c64', 'b0c39e5d9841c79eca364e5220c5108edcde59ab6bdd098571fc23efb27b45b8', '2024-07-07 23:51:31.151976+03', '20240706224050_default_role', NULL, NULL, '2024-07-07 23:51:31.150232+03', 1) ON CONFLICT DO NOTHING;
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('563e1ef6-862d-4bf7-a6ff-3ab78bdb4c56', 'ab80a534dfa4779eeae4ae5aeac192eea19b283671d6083c8f112e3c8a4229df', '2024-07-07 23:51:31.15387+03', '20240706225300_password', NULL, NULL, '2024-07-07 23:51:31.152585+03', 1) ON CONFLICT DO NOTHING;
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('2b47d72f-0f98-4e43-b0d1-bef8da21d399', 'c281f2947dd9960d6f02f3ce9994beb5765a9d7ae61a39947f271d5d0a4e465e', '2024-07-07 23:51:31.155802+03', '20240706233313_signature_fix', NULL, NULL, '2024-07-07 23:51:31.154389+03', 1) ON CONFLICT DO NOTHING;
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('a6b709c7-df48-4bcd-9bb2-b3385de70378', 'f165c63cc236e8134f8b965a5125f5a8d10710d56ff1faa27f8a1489b70b8fac', '2024-07-07 23:51:38.733037+03', '20240707205138_upd', NULL, NULL, '2024-07-07 23:51:38.726934+03', 1) ON CONFLICT DO NOTHING;
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('cc5da2b6-7116-425b-a3f7-eed24e313854', 'e782521454374a8445e9dfae7c698e28a26ddc4b75d2f68f0fa034e65a7b0d0b', '2024-07-09 23:58:13.353338+03', '20240709205813_upd_sig', NULL, NULL, '2024-07-09 23:58:13.349754+03', 1) ON CONFLICT DO NOTHING;
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('56497071-92e5-496f-b6e8-4163df7d6ffc', '888c2260b2417ec01ce01ec8c59e48bc1145ed5d3cababfb992d8190bac7d1cf', '2024-07-17 00:23:19.089797+03', '20240716212319_cascade', NULL, NULL, '2024-07-17 00:23:19.079318+03', 1) ON CONFLICT DO NOTHING;
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('38712b91-1901-4093-b6ff-c96fc5bfc376', '768eea7e09b60179811151c45fea8d39b4c51ec0d96e73f91fff5f95c6399d1f', '2024-09-18 21:12:38.474369+03', '20240918181238_status_delivered', NULL, NULL, '2024-09-18 21:12:38.469298+03', 1) ON CONFLICT DO NOTHING;


--
-- TOC entry 3705 (class 0 OID 0)
-- Dependencies: 218
-- Name: Post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: public_hysteria
--

SELECT pg_catalog.setval('public."Post_id_seq"', 2, true);


--
-- TOC entry 3706 (class 0 OID 0)
-- Dependencies: 216
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: public_hysteria
--

SELECT pg_catalog.setval('public."User_id_seq"', 13, true);


--
-- TOC entry 3540 (class 2606 OID 34636)
-- Name: Post Post_pkey; Type: CONSTRAINT; Schema: public; Owner: public_hysteria
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_pkey" PRIMARY KEY (id);


--
-- TOC entry 3542 (class 2606 OID 34644)
-- Name: Signature Signature_pkey; Type: CONSTRAINT; Schema: public; Owner: public_hysteria
--

ALTER TABLE ONLY public."Signature"
    ADD CONSTRAINT "Signature_pkey" PRIMARY KEY ("postId", "userId");


--
-- TOC entry 3538 (class 2606 OID 34627)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: public_hysteria
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 3535 (class 2606 OID 34613)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: public_hysteria
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 3536 (class 1259 OID 34750)
-- Name: User_phone_key; Type: INDEX; Schema: public; Owner: public_hysteria
--

CREATE UNIQUE INDEX "User_phone_key" ON public."User" USING btree (phone);


--
-- TOC entry 3543 (class 2606 OID 37510)
-- Name: Signature Signature_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: public_hysteria
--

ALTER TABLE ONLY public."Signature"
    ADD CONSTRAINT "Signature_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Post"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3544 (class 2606 OID 37515)
-- Name: Signature Signature_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: public_hysteria
--

ALTER TABLE ONLY public."Signature"
    ADD CONSTRAINT "Signature_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3702 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: public_hysteria
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2024-09-18 23:25:13 MSK

--
-- PostgreSQL database dump complete
--

