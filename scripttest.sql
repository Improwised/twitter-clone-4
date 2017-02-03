--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.1
-- Dumped by pg_dump version 9.6.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner:
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: follow; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE follow (
    id_f integer NOT NULL,
    login_user integer,
    follower_id integer
);


ALTER TABLE follow OWNER TO postgres;

--
-- Name: follow_id_f_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE follow_id_f_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE follow_id_f_seq OWNER TO postgres;

--
-- Name: follow_id_f_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE follow_id_f_seq OWNED BY follow.id_f;


--
-- Name: registration; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE registration (
    id integer NOT NULL,
    username character varying,
    password character varying,
    email character varying,
    image text
);


ALTER TABLE registration OWNER TO postgres;

--
-- Name: registration_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE registration_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE registration_id_seq OWNER TO postgres;

--
-- Name: registration_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE registration_id_seq OWNED BY registration.id;


--
-- Name: twit; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE twit (
    id integer NOT NULL,
    tweet_text text,
    "time" timestamp with time zone DEFAULT '2017-02-01 06:22:08.010739+00'::timestamp with time zone,
    user_id integer
);


ALTER TABLE twit OWNER TO postgres;

--
-- Name: twit_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE twit_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE twit_id_seq OWNER TO postgres;

--
-- Name: twit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE twit_id_seq OWNED BY twit.id;


--
-- Name: follow id_f; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY follow ALTER COLUMN id_f SET DEFAULT nextval('follow_id_f_seq'::regclass);


--
-- Name: registration id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY registration ALTER COLUMN id SET DEFAULT nextval('registration_id_seq'::regclass);


--
-- Name: twit id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY twit ALTER COLUMN id SET DEFAULT nextval('twit_id_seq'::regclass);


--
-- Data for Name: follow; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY follow (id_f, login_user, follower_id) FROM stdin;
\.


--
-- Name: follow_id_f_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('follow_id_f_seq', 7, true);


--
-- Data for Name: registration; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY registration (id, username, password, email, image) FROM stdin;
\.


--
-- Name: registration_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('registration_id_seq', 7, true);


--
-- Data for Name: twit; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY twit (id, tweet_text, "time", user_id) FROM stdin;
\.


--
-- Name: twit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('twit_id_seq', 7, true);


--
-- Name: follow follow_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY follow
    ADD CONSTRAINT follow_pkey PRIMARY KEY (id_f);


--
-- Name: registration registration_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY registration
    ADD CONSTRAINT registration_pkey PRIMARY KEY (id);


--
-- Name: twit twit_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY twit
    ADD CONSTRAINT twit_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

