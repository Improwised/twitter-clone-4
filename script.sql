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
-- Name: registration_id_seq; Type: SEQUENCE; Schema: public; Owner: nidhi
--

CREATE SEQUENCE registration_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE registration_id_seq OWNER TO nidhi;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: registration; Type: TABLE; Schema: public; Owner: nidhi
--

CREATE TABLE registration (
    id integer DEFAULT nextval('registration_id_seq'::regclass),
    username character varying,
    password character varying,
    email character varying
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
    "like" integer,
    user_id integer
);


ALTER TABLE twit OWNER TO nidhi;

--
-- Data for Name: registration; Type: TABLE DATA; Schema: public; Owner: nidhi
--

COPY registration (id, username, password, email) FROM stdin;
\.


--
-- Name: registration_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nidhi
--

SELECT pg_catalog.setval('registration_id_seq', 15, true);


--
-- Data for Name: twit; Type: TABLE DATA; Schema: public; Owner: nidhi
--

COPY twit (id, tweet_text, "time", "like", user_id) FROM stdin;
\.


--
-- Name: twit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nidhi
--

SELECT pg_catalog.setval('twit_id_seq', 23, true);


--
-- Name: twit twit_pkey; Type: CONSTRAINT; Schema: public; Owner: nidhi
--

ALTER TABLE ONLY twit
    ADD CONSTRAINT twit_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

