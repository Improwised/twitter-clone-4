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

--
-- Name: follow_id_seq; Type: SEQUENCE; Schema: public; Owner: nidhi
--

CREATE SEQUENCE follow_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE follow_id_seq OWNER TO nidhi;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: follow; Type: TABLE; Schema: public; Owner: nidhi
--

CREATE TABLE follow (
    id_f integer DEFAULT nextval('follow_id_seq'::regclass) NOT NULL,
    login_user integer,
    follower_id integer
);


ALTER TABLE follow OWNER TO nidhi;

--
-- Name: registration_id_seq; Type: SEQUENCE; Schema: public; Owner: nidhi
--

CREATE SEQUENCE registration_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE registration_id_seq OWNER TO nidhi;

--
-- Name: registration; Type: TABLE; Schema: public; Owner: nidhi
--

CREATE TABLE registration (
    id integer DEFAULT nextval('registration_id_seq'::regclass),
    username character varying,
    password character varying,
    email character varying,
    image text
);


ALTER TABLE registration OWNER TO nidhi;

--
-- Name: twit_id_seq; Type: SEQUENCE; Schema: public; Owner: nidhi
--

CREATE SEQUENCE twit_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE twit_id_seq OWNER TO nidhi;

--
-- Name: twit; Type: TABLE; Schema: public; Owner: nidhi
--

CREATE TABLE twit (
    id integer DEFAULT nextval('twit_id_seq'::regclass) NOT NULL,
    tweet_text text,
    "time" timestamp with time zone DEFAULT '2017-01-23 11:08:07.983262'::timestamp without time zone,
    user_id integer
);


ALTER TABLE twit OWNER TO nidhi;

--
-- Data for Name: follow; Type: TABLE DATA; Schema: public; Owner: nidhi
--

COPY follow (id_f, login_user, follower_id) FROM stdin;
106	58	55
107	58	56
108	55	56
109	55	57
113	59	56
114	59	55
115	59	58
116	59	57
118	55	58
\.


--
-- Name: follow_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nidhi
--

SELECT pg_catalog.setval('follow_id_seq', 118, true);


--
-- Data for Name: registration; Type: TABLE DATA; Schema: public; Owner: nidhi
--

COPY registration (id, username, password, email, image) FROM stdin;
56	hetu	123	hetasvi@gmail.com	fd26f7e4038f64f68fac232bab89fa46
57	bansi	123	bansi@gmail.com	bd12a16c391e46a63dfbb10e20cc1a61
58	Dhwani	1234	d@gmail.com	11d377b83aed9231f82901e1782ba7b3
55	Nidhi1264	123	nidhi311@gmail.com	68a9cc6047fe583ea18b1ababc55e099
59	Mona	123	m@gmail.com	5eec1c338393c679e08e6a4f09bd49d4
\.


--
-- Name: registration_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nidhi
--

SELECT pg_catalog.setval('registration_id_seq', 59, true);


--
-- Data for Name: twit; Type: TABLE DATA; Schema: public; Owner: nidhi
--

COPY twit (id, tweet_text, "time", user_id) FROM stdin;
70	hiiiii gm...	2017-02-02 04:52:08.839399+00	56
71	heloooo	2017-02-02 04:52:35.839285+00	57
72	hiiii ............!!!!!!!!!!!!!	2017-02-02 04:53:06.54585+00	58
79	hhhiii	2017-02-02 09:42:08.228051+00	55
80	hiiii ............!!!!!!!!!!!!!	2017-02-02 09:42:12.349575+00	55
81	hiiiiii...friends...	2017-02-02 09:42:17.26162+00	55
82	hiiii this is my tweet....!!!!!!!	2017-02-02 10:53:20.585451+00	59
83	fdgfdvhgjnbgngb	2017-02-02 10:56:36.746549+00	59
\.


--
-- Name: twit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nidhi
--

SELECT pg_catalog.setval('twit_id_seq', 83, true);


--
-- Name: follow follow_pkey; Type: CONSTRAINT; Schema: public; Owner: nidhi
--

ALTER TABLE ONLY follow
    ADD CONSTRAINT follow_pkey PRIMARY KEY (id_f);


--
-- Name: twit twit_pkey; Type: CONSTRAINT; Schema: public; Owner: nidhi
--

ALTER TABLE ONLY twit
    ADD CONSTRAINT twit_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

