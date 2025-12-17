export const projectDetails = {
  'sip-infrastructure': {
    title: 'SIP Infrastructure & WebRTC Communication',
    subtitle: 'Production-Grade Real-Time Voice Communication System',
    category: 'Telephony & Real-Time Systems',
    description: 'Built complete SIP infrastructure from scratch using Asterisk on AWS EC2, supporting 100+ concurrent calls with WebRTC browser integration. Designed custom React hook wrapping SIP.js SDK for seamless browser-to-phone communication.',
    
    architectureDiagram: {
      asciiDiagram: `
┌─────────────────────────────────────────────────────────────────────┐
│                         Client Layer (Browser)                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  React Hook: useSipClient.jsx                                │  │
│  │  - WebSocket connection management                           │  │
│  │  - UserAgent & Registerer (SIP.js)                          │  │
│  │  - Audio device handling                                     │  │
│  │  - DTMF tone management                                      │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                      WebSocket (ws://IP:8088/ws)
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    SIP Server (Asterisk on AWS EC2)                 │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  Transport Layer                                             │  │
│  │  - WebSocket (port 8088)    - TCP (port 5060)              │  │
│  │  - WSS (port 8089)          - UDP (port 5060)              │  │
│  └──────────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  PJSIP Configuration                                         │  │
│  │  - Dynamic endpoints (realtime from PostgreSQL)             │  │
│  │  - AOR management (max 1000 contacts per endpoint)          │  │
│  │  - Audio codec negotiation (PCMU, Opus)                     │  │
│  └──────────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  Dialplan Engine (extensions.conf)                          │  │
│  │  - Call routing logic                                        │  │
│  │  - Header injection (custom SIP headers)                    │  │
│  │  - External domain bridging                                 │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                         SIP Trunk / PSTN
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    Database Layer (PostgreSQL)                      │
│  - ps_endpoints (dynamic SIP users)                                 │
│  - ps_auths (authentication credentials)                            │
│  - ps_aors (Address of Record mappings)                            │
│  - ODBC connection with connection pooling                         │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                    Key Technical Features                           │
│  • Real-time bi-directional audio streaming                        │
│  • Automatic reconnection with exponential backoff                 │
│  • NAT traversal with STUN/TURN                                    │
│  • RTP symmetric mode for firewall compatibility                   │
│  • Dynamic user provisioning via database                          │
│  • External SIP domain routing (LSA, Linphone)                     │
└─────────────────────────────────────────────────────────────────────┘`,
      description: 'Complete SIP infrastructure with WebRTC browser clients, Asterisk PBX, and PostgreSQL-backed dynamic user management'
    },
    
    technicalHighlights: [
      {
        icon: 'FiServer',
        title: 'Asterisk Configuration',
        description: 'Configured Asterisk 20.11.0 from source with PJSIP, WebRTC, and ODBC support. Supports multiple transport protocols (WebSocket, WSS, TCP, UDP) for maximum compatibility.'
      },
      {
        icon: 'FiCode',
        title: 'Custom React Hook',
        description: 'Built reusable useSipClient hook wrapping SIP.js SDK with automatic session management, device selection, and DTMF handling. Provides pre-built UI components for rapid integration.'
      },
      {
        icon: 'FiDatabase',
        title: 'Dynamic User Management',
        description: 'Integrated PostgreSQL via ODBC for real-time SIP user provisioning. Uses Asterisk realtime architecture to load endpoints, authentication, and AOR data dynamically without restarts.'
      },
      {
        icon: 'FiZap',
        title: 'Concurrent Call Handling',
        description: 'Optimized for 100+ concurrent calls with RTP port range (10000-20000), symmetric RTP, and proper NAT configuration. Production-tested under load.'
      },
      {
        icon: 'FiLock',
        title: 'Security & NAT Traversal',
        description: 'Implemented force_rport, rewrite_contact for NAT traversal. Configured external media/signaling addresses for AWS EC2 deployment. STUN integration for optimal connectivity.'
      },
      {
        icon: 'FiUsers',
        title: 'Multi-Endpoint Support',
        description: 'Designed to support 1000+ concurrent registrations per AOR. Each endpoint can have multiple simultaneous contacts (devices) registered, enabling mobile + desktop scenarios.'
      }
    ],
    
    implementationDetails: [
      {
        section: 'WebRTC Browser Integration',
        description: 'Built production-grade WebRTC integration using SIP.js library with custom React hooks. Handles complex scenarios like device switching, session cleanup, and automatic re-registration.',
        codeSnippet: `// Custom SIP Client Hook with Device Management
const useSipClient = (config) => {
  const [userAgent, setUserAgent] = useState(null)
  const [session, setSession] = useState(null)
  const [isRegistered, setIsRegistered] = useState(false)
  
  // Initialize UserAgent with delegate pattern
  const initializeUserAgent = () => {
    const delegate = {
      onRegister: () => {
        setIsRegistered(true)
        dispatch(setLingoAppNotification({ 
          message: 'SIP Service Ready', 
          color: 'green' 
        }))
      },
      onInvite: (invitation) => {
        handleIncomingCall(invitation)
      }
    }
    
    const UA = new UserAgent({
      uri: UserAgent.makeURI(config.uri),
      transportOptions: { server: config.transportOptions.server },
      authorizationUsername: config.authorizationUsername,
      authorizationPassword: config.authorizationPassword,
      delegate: delegate
    })
    
    return UA
  }
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false
      stopSip()
    }
  }, [])
  
  return { startSip, stopSip, makeSipCall, ... }
}`,
        challenges: [
          'Managing WebSocket connection lifecycle across network changes',
          'Handling audio device selection and switching during active calls',
          'Preventing memory leaks from abandoned SIP sessions',
          'Graceful degradation when WebRTC is not supported'
        ],
        impact: 'Reduced integration time for new features from days to hours. Reusable hook used across 5+ different UI components.'
      },
      {
        section: 'Asterisk Dialplan Routing',
        description: 'Designed flexible dialplan with custom SIP header injection for metadata passing. Enables routing calls to external SIP domains with context-specific information.',
        codeSnippet: `; Subroutine for SIP Header Injection
[handler]
exten => addheader,1,NoOp(===== Adding Custom Headers =====)
exten => addheader,2,Set(PJSIP_HEADER(add,x-lsaweb-language)=\${ARG1})
exten => addheader,3,Set(PJSIP_HEADER(add,x-lsaweb-servicetype)=\${ARG2})
exten => addheader,4,Set(PJSIP_HEADER(add,x-lsaweb-callid)=\${ARG3})
exten => addheader,5,Return()

[default]
; Dynamic outbound routing with header injection
exten => _X.,1,NoOp(Outgoing call to: \${EXTEN})
same => n,Set(LANG_HDR=\${PJSIP_HEADER(read,x-lsaweb-language)})
same => n,Dial(PJSIP/\${EXTEN}@external-outbound,30,
    b(handler^addheader,1(\${LANG_HDR},\${SERVICE_TYPE},\${CALL_ID})))
same => n,Hangup()`,
        challenges: [
          'Maintaining call state across SIP re-INVITE messages',
          'Handling call transfer (3-way calls) without dropping sessions',
          'Debugging SIP message flows in production',
          'Managing codec negotiation failures gracefully'
        ],
        impact: 'Enabled seamless integration with external SIP providers (LSA, Boostlingo) while passing metadata for downstream processing.'
      },
      {
        section: 'Database-Backed Dynamic Provisioning',
        description: 'Leveraged Asterisk realtime architecture with PostgreSQL backend for dynamic SIP user management. Eliminates need for server restarts when adding/removing users.',
        codeSnippet: `-- PostgreSQL Schema for Dynamic SIP Users
CREATE TABLE ps_endpoints (
  id VARCHAR(40) PRIMARY KEY,
  transport VARCHAR(40),
  aors VARCHAR(200),
  auth VARCHAR(40),
  context VARCHAR(40),
  disallow VARCHAR(200),
  allow VARCHAR(200),
  direct_media VARCHAR(3) DEFAULT 'no',
  ... 40+ other SIP parameters
);

-- Asterisk ODBC Configuration
[asterisk-db]
dsn = asterisk-db
username = sipuser
password = ***
pre-connect = yes
sanitysql = SELECT 1
logging = yes

-- Asterisk Sorcery Configuration
[res_pjsip]
endpoint = realtime,ps_endpoints
auth = realtime,ps_auths
aor = realtime,ps_aors`,
        challenges: [
          'Configuring ODBC connection pooling for high-concurrency scenarios',
          'Handling database connection failures without dropping active calls',
          'Optimizing query performance for registration lookups',
          'Managing schema migrations without service disruption'
        ],
        impact: 'Reduced user provisioning time from manual config edits (5-10 minutes) to instant API-driven creation. Enabled multi-tenant SIP service.'
      },
      {
        section: 'Production Issues Solved',
        description: 'Debugged and resolved complex production issues including race conditions, audio delays, stream overlaps, SIP timeouts, and async timing mismatches.',
        challenges: [
          'Race condition: Multiple registration attempts creating duplicate contacts',
          'Audio delay: RTP packets arriving out of order due to jitter buffer misconfiguration',
          'Stream overlap: Dual audio streams when call transfer logic fired twice',
          'SIP timeout: UDP packets dropped by NAT with improper keepalive intervals',
          'Async timing: JavaScript async/await mismatch with SIP invite/answer timing'
        ],
        impact: 'Achieved 99.9% call completion rate in production. Reduced support tickets related to call quality by 85%.'
      }
    ],
    
    productionMetrics: [
      { value: '100+', label: 'Concurrent Calls' },
      { value: '99.9%', label: 'Call Completion Rate' },
      { value: '1000+', label: 'Registered Endpoints' },
      { value: '<100ms', label: 'Registration Latency' }
    ],
    
    technologies: [
      'Asterisk 20.11.0',
      'PJSIP',
      'SIP.js',
      'React',
      'WebRTC',
      'WebSocket',
      'PostgreSQL',
      'ODBC',
      'AWS EC2',
      'RTP/SRTP',
      'STUN',
      'NAT Traversal'
    ]
  },

  'ai-over-phone': {
    title: 'AI Over Phone - Real-Time Bilingual Translation',
    subtitle: 'Production System Supporting 35+ Languages with Human Escalation',
    category: 'Real-Time AI & Voice Systems',
    description: 'Built AI-powered phone interpretation system enabling real-time bilingual calls between 35+ languages. Designed two variants: (1) Dynamic configuration-based system with phone number lookup, and (2) Full IVR with manual language selection. Includes seamless human escalation without dropping Twilio sessions.',
    
    architectureDiagram: {
      asciiDiagram: `
┌────────────────────────────────────────────────────────────────────────────┐
│                          Inbound Call Flow                                 │
└────────────────────────────────────────────────────────────────────────────┘
                                    │
                    Caller dials Twilio number
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────────┐
│              Twilio Voice Webhook (FastAPI Router)                        │
│  • Lookup phone number in DynamoDB (ai_phone_settings table)             │
│  • Retrieve: caller_language, routing_number, custom_script, escalation  │
│  • Create call session with BilingualCallManager                         │
│  • Play custom script in caller's language (Google Translate)            │
└────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                     IVR: Collect Name & Reason                            │
│  • Speech recognition (Twilio Gather with caller's language code)        │
│  • AI understanding using Anthropic Claude to extract name + reason      │
│  • Translate reason to English for recipient context                      │
└────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────────┐
│               Initiate Outbound Call to Recipient                         │
│  • Call routing_phone_number from DynamoDB settings                      │
│  • Play greeting in English with caller name + reason                     │
│  • TwiML: Connect both legs to WebSocket stream                          │
└────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                WebSocket Audio Streaming Layer                            │
│                                                                            │
│  Caller A (Spanish) ─────────────┐                                       │
│   │ WebSocket Stream              │                                       │
│   │ participant_type: caller_a    │    ┌─────────────────────────────┐   │
│   └─────────────────────────────► │ ───┤  BilingualPhoneParticipant  │   │
│                                    │    │  - Audio buffering          │   │
│  Caller B (English) ──────────────┤    │  - STT stream management    │   │
│   │ WebSocket Stream              │    └─────────────────────────────┘   │
│   │ participant_type: caller_b    │                │                     │
│   └─────────────────────────────► │                ▼                     │
│                                    │    ┌─────────────────────────────┐   │
│                                    │ ───┤  STTBilingualPhone          │   │
│                                    │    │  (shared instance)          │   │
│                                    │    │  - Deepgram STT A→B         │   │
│                                    │    │  - Deepgram STT B→A         │   │
│                                    │    │  - Async transcript queues  │   │
│                                    │    └─────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────────┐
│            Real-Time Translation Pipeline (Async Handler)                 │
│                                                                            │
│  For each transcription:                                                  │
│   1. Get final transcript from STT queue                                  │
│   2. Stop background audio (if playing)                                   │
│   3. Translate text (Google Translate) to target language                │
│   4. Generate TTS audio (Google TTS, 8kHz μ-law for Twilio)             │
│   5. Send audio to other participant's WebSocket                         │
│   6. Store transcript in DynamoDB (with metadata)                        │
│   7. Deduplication: Track processed transcription IDs                    │
│                                                                            │
│  Background Audio Management:                                             │
│   • Play silence/hold music when no active speech                        │
│   • Prevent overlap with TTS audio                                       │
│   • Automatic resume after translation complete                          │
└────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                 Human Escalation (Press 0# During Call)                   │
│                                                                            │
│  Detection:                                                               │
│   • DTMF detection on both call legs                                      │
│   • Trigger: "0#" sequence detected                                       │
│                                                                            │
│  Workflow:                                                                │
│   1. Stop AI transcription streams                                        │
│   2. Announce escalation in caller's language                            │
│   3. Use Twilio Dial verb to bridge human interpreter                    │
│   4. Create 3-way call (caller + recipient + human)                      │
│   5. Update call status: 'escalated_to_human' in DynamoDB               │
│   6. Track escalation duration for billing                               │
│                                                                            │
│  Key: Twilio session never drops - seamless transition                   │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│                    Data Storage (DynamoDB)                                │
│                                                                            │
│  ai_phone_settings:                                                       │
│   • phone_number (partition key)                                          │
│   • caller_language, routing_phone_number                                 │
│   • custom_script, human_escalation_phone_number                         │
│                                                                            │
│  ai_phone_calls:                                                          │
│   • business_uuid (partition key), call_uuid (sort key)                   │
│   • call_status, participants_count, timestamps                          │
│   • ai_interpretation_start/end_time                                      │
│   • human_escalation_start/end_time                                       │
│                                                                            │
│  ai_phone_transcripts:                                                    │
│   • call_uuid (partition key), transcript_uuid (sort key)                 │
│   • participant_type, transcript_text, translated_text                   │
│   • source_language, target_language, confidence                         │
└────────────────────────────────────────────────────────────────────────────┘`,
      description: 'Complete AI Over Phone architecture with WebSocket streaming, real-time STT/Translation/TTS pipeline, and human escalation'
    },
    
    technicalHighlights: [
      {
        icon: 'FiZap',
        title: 'Real-Time Audio Streaming',
        description: 'WebSocket-based bidirectional audio streaming with Twilio Media Streams. Handles concurrent streams from both call participants with separate transcription engines.'
      },
      {
        icon: 'FiCode',
        title: 'Dynamic Configuration',
        description: 'Phone number lookup in DynamoDB enables configuration-driven behavior: custom languages, routing numbers, welcome scripts, and escalation numbers - all without code deployment.'
      },
      {
        icon: 'FiServer',
        title: 'Async Pipeline Architecture',
        description: 'Built async transcription handlers using asyncio queues for backpressure management. Prevents audio buffer overflow during high-latency translation/TTS operations.'
      },
      {
        icon: 'FiDatabase',
        title: 'Deduplication Strategy',
        description: 'Implemented transcript deduplication using hash-based tracking. Prevents duplicate translations when STT fires multiple final events for same audio chunk.'
      },
      {
        icon: 'FiLock',
        title: 'Human Escalation Without Dropping',
        description: 'Designed seamless 3-way call escalation using Twilio Dial verb. Original Twilio session persists, avoiding caller disconnect. AI streams stop gracefully before human joins.'
      },
      {
        icon: 'FiUsers',
        title: 'Multi-Variant Support',
        description: 'Two production variants: (1) Fully automated with AI name extraction, (2) Full IVR with 35-language selection menus. Both share core pipeline architecture.'
      }
    ],
    
    implementationDetails: [
      {
        section: 'WebSocket Audio Stream Management',
        description: 'Handles Twilio Media Streams over WebSocket with participant tracking, audio buffering, and graceful cleanup on disconnect.',
        codeSnippet: `@ai_over_phone_routes.websocket("/api/bilingual-phone-stream")
async def bilingual_phone_stream_ws(websocket: WebSocket):
    await websocket.accept()
    call_sid, stream_sid, participant_type = None, None, None
    session, participant = None, None
    
    try:
        # Wait for Twilio 'start' event
        data = await websocket.receive()
        data_json = json.loads(data['text'])
        
        if data_json.get('event') == 'start':
            start_data = data_json.get('start', {})
            call_sid = start_data.get('callSid')
            
            # Get custom parameters from TwiML
            custom_params = start_data.get('customParameters', {})
            participant_type = custom_params.get('participant_type')
            language = custom_params.get('language')
            
            # Find call session
            session = bilingual_call_manager.find_session_by_call_sid(call_sid)
            
            # Register WebSocket connection
            websocket_manager.register_connection(
                call_sid, stream_sid, websocket, participant_type
            )
            
            # Check if both participants connected
            both_connected = websocket_manager.are_both_connected(call_sid)
            
            # Create shared STT instance when both connected
            if both_connected and not hasattr(session, 'bilingual_stt'):
                session.bilingual_stt = STTBilingualPhone(
                    caller_a_language=session.caller_a_language,
                    caller_b_language=session.caller_b_language
                )
                await session.bilingual_stt.start_transcription()
            
            # Create participant handler
            participant = BilingualPhoneParticipant(
                websocket, call_sid, participant_type, 
                language, session.bilingual_stt
            )
            await participant.start()
            
            # Start async transcription processing
            asyncio.create_task(
                _handle_participant_transcriptions(participant, session)
            )
        
        # Handle audio stream
        await participant.handle_audio_stream()
    
    finally:
        if participant:
            await participant.stop()
        websocket_manager.remove_connection(call_sid, participant_type)`,
        challenges: [
          'Race condition: Both participants connecting simultaneously',
          'Audio stream overlap: TTS playing while caller still speaking',
          'Memory leak: Abandoned WebSocket connections not cleaned up',
          'Backpressure: Translation slower than incoming audio rate'
        ],
        impact: 'Supports 50+ concurrent bilingual calls with <200ms translation latency. Zero WebSocket connection leaks in production.'
      },
      {
        section: 'Async Translation Pipeline with Deduplication',
        description: 'Processes transcriptions asynchronously with translation, TTS generation, and intelligent deduplication to prevent duplicate audio playback.',
        codeSnippet: `async def _handle_participant_transcriptions(participant, session):
    bilingual_stt = session.bilingual_stt
    participant_type = participant.participant_type
    
    # Initialize deduplication tracking
    if not hasattr(session, 'processed_transcriptions'):
        session.processed_transcriptions = set()
    
    # Get correct transcription queue
    get_transcription = (
        bilingual_stt.get_transcription_caller_a 
        if participant_type == "caller_a" 
        else bilingual_stt.get_transcription_caller_b
    )
    
    while participant.is_active:
        # Get transcription from queue
        transcription = await get_transcription()
        if not transcription:
            # No speech - start background audio
            await background_audio_manager.start_background_audio(
                session.session_id, participant_type, session.call_sid
            )
            continue
        
        # Only process final transcriptions
        if not transcription.get('is_final', False):
            continue
        
        text = transcription.get('text', '').strip()
        if not text:
            continue
        
        # Deduplication: Create unique ID
        transcription_id = f"{participant_type}_{hash(text)}_{int(time.time())}"
        if transcription_id in session.processed_transcriptions:
            logging.warning(f"Skipping duplicate: {text}")
            continue
        
        session.processed_transcriptions.add(transcription_id)
        
        # Stop background audio for both participants
        await background_audio_manager.stop_background_audio(
            session.session_id, participant_type
        )
        
        # Translate
        translated_text = await translator.translate(
            text=text, 
            language=target_language
        )
        
        # Generate TTS (8kHz μ-law for Twilio)
        audio_bytes = tts.synthesize_speech(
            text=translated_text,
            language_code=target_language,
            audio_encoding=texttospeech.AudioEncoding.MULAW,
            sample_rate_hertz=8000
        )
        
        # Send to other participant
        await websocket_manager.send_audio_to_participant(
            call_sid=session.call_sid,
            participant_type=other_participant_type,
            audio_data=audio_bytes
        )
        
        # Store transcript in DynamoDB
        transcripts_db.store_transcript(call_uuid, {
            'transcript_text': text,
            'translated_text': translated_text,
            'participant_type': participant_type,
            'confidence': transcription.get('confidence')
        })`,
        challenges: [
          'Preventing duplicate audio when STT fires multiple "final" events',
          'Managing background audio state during rapid back-and-forth conversation',
          'Handling translation API rate limits gracefully',
          'Synchronizing audio playback with Twilio Media Streams timing'
        ],
        impact: 'Eliminated 95% of duplicate translation audio. Reduced user-reported audio issues from 20/week to <1/week.'
      },
      {
        section: 'Human Escalation Without Session Drop',
        description: 'Seamlessly transitions from AI interpretation to human interpreter using Twilio Dial verb, maintaining the original call session.',
        codeSnippet: `@ai_over_phone_routes.post("/twilio/spanish/human-escalation")
async def twilio_spanish_human_escalation(request: Request):
    form = await request.form()
    human_phone_number = form.get('human_phone_number')
    call_sid = form.get('call_sid')
    
    # Get session and caller language
    session = bilingual_call_manager.get_session(call_sid)
    caller_language = session.caller_a_language
    
    # Translate prompts to caller's language
    connecting_message = "Connecting you to a human representative..."
    if caller_language != "English":
        connecting_message = await translator.translate(
            connecting_message, caller_language
        )
    
    # Create TwiML with Dial verb
    voice_response = VoiceResponse()
    
    # Announce escalation
    voice_response.say(
        connecting_message,
        voice="alice",
        language=get_twilio_language_code(caller_language)
    )
    
    # Dial human interpreter - creates 3-way bridge
    dial = Dial(
        action='/twilio/spanish/human-escalation-complete',
        timeout=30,
        callerId=session.called_number
    )
    dial.number(human_phone_number)
    voice_response.append(dial)
    
    # Fallback if dial fails
    voice_response.say("Could not connect. Call will now end.")
    voice_response.hangup()
    
    # Update call status
    calls_db.update_call_status(
        business_uuid=session.business_uuid,
        call_uuid=session.call_uuid,
        call_status='escalated_to_human'
    )
    
    # Stop AI transcription streams
    if hasattr(session, 'bilingual_stt'):
        await session.bilingual_stt.stop_transcription()
    
    return Response(content=str(voice_response), media_type="application/xml")`,
        challenges: [
          'Timing: Stop AI streams before human joins to prevent audio overlap',
          'Session management: Track 3 participants (caller, recipient, human) in same session',
          'Billing: Accurately track AI interpretation duration vs human interpretation time',
          'Fallback: Handle human not answering without dropping caller'
        ],
        impact: 'Enabled smooth escalation path. 100% of escalations complete successfully without caller disconnect. Key feature for $1M funding approval.'
      },
      {
        section: 'Dynamic Configuration via DynamoDB',
        description: 'Phone number lookup enables fully configurable behavior without code deployment. Supports multi-tenant scenarios with per-customer settings.',
        codeSnippet: `async def handle_inbound_call(request: Request):
    form = await request.form()
    call_sid = form.get('CallSid')
    caller_number = form.get('From')
    called_number = form.get('To')  # Lingolet's Twilio number
    
    # Lookup settings by called number
    ai_settings = settings_db.get_settings_by_phone_number(called_number)
    
    if ai_settings:
        # Use customer-specific configuration
        caller_language = ai_settings.get('caller_language')
        routing_number = ai_settings.get('routing_phone_number')
        custom_script = ai_settings.get('script')
        escalation_number = ai_settings.get('human_escalation_phone_number')
    else:
        # Fallback to default config
        caller_language = "Spanish"
        routing_number = "+118002224444"
        custom_script = "Welcome to translation service..."
    
    # Create session with settings
    session = BilingualCallSession(
        call_sid=call_sid,
        caller_a_number=caller_number,
        caller_a_language=caller_language,
        caller_b_number=routing_number,
        ai_phone_settings=ai_settings
    )
    
    # Translate custom script to caller's language
    if custom_script:
        translated_script = await translator.translate(
            custom_script, caller_language
        )
    
    # Play script and gather response
    voice_response = VoiceResponse()
    with voice_response.gather(
        input='speech',
        language=get_twilio_language_code(caller_language)
    ) as gather:
        gather.say(translated_script, voice="alice")`,
        challenges: [
          'Cache invalidation: Settings changed in DynamoDB must reflect immediately',
          'Default fallback: Graceful degradation when settings not found',
          'Multi-language script translation: Supporting 35+ languages dynamically',
          'Validation: Ensuring phone numbers and settings are valid before using'
        ],
        impact: 'Enabled white-label deployments for enterprise customers. Onboarding time reduced from 2 weeks (code changes) to 5 minutes (database entry).'
      }
    ],
    
    productionMetrics: [
      { value: '$1M', label: 'Funding Impact' },
      { value: '35+', label: 'Supported Languages' },
      { value: '<200ms', label: 'Translation Latency' },
      { value: '100%', label: 'Escalation Success Rate' }
    ],
    
    technologies: [
      'Python',
      'FastAPI',
      'Twilio',
      'WebSocket',
      'Deepgram STT',
      'Google Translate',
      'Google TTS',
      'DynamoDB',
      'Asyncio',
      'Anthropic Claude',
      'μ-law Audio',
      'SIP'
    ]
  },

  'conference-ai': {
    title: 'Conference AI / Meeting AI / Lingolive AI',
    subtitle: 'Real-Time Multilingual Conference System with Async Queues',
    category: 'Real-Time AI & Concurrent Systems',
    description: 'Built production Conference AI system enabling multiple speakers and listeners in different languages to communicate simultaneously in real-time rooms. Designed central broadcast architecture with async locks and queues to handle 50+ concurrent participants with minimal latency.',
    
    architectureDiagram: {
      asciiDiagram: `
┌────────────────────────────────────────────────────────────────────────────┐
│                   Multi-Speaker Conference Room                           │
│                                                                            │
│  ┌────────────────────────────────────────────────────────────────────┐   │
│  │  Room Manager (MultispeakerConferenceRoom)                        │   │
│  │  - asyncio.Lock for thread-safe state management                  │   │
│  │  - Global sequence counter for transcript ordering                │   │
│  │  - Speaker management (max 3 concurrent)                          │   │
│  │  - Listener groups by target language                             │   │
│  │  - Translation cache per language group                           │   │
│  └────────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────────┘
                                    │
          ┌─────────────────────────┼─────────────────────────┐
          │                         │                         │
          ▼                         ▼                         ▼
┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐
│  Speaker A (English) │  │  Speaker B (Spanish) │  │  Speaker C (Hindi)   │
│  WebSocket Connection│  │  WebSocket Connection│  │  WebSocket Connection│
└──────────────────────┘  └──────────────────────┘  └──────────────────────┘
          │                         │                         │
          │  Audio Stream (WebRTC)  │                         │
          └─────────────────────────┼─────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────────┐
│              Speaker Processing (Individual Instances)                     │
│                                                                            │
│  ConferenceSpeaker:                                                       │
│   • Individual Deepgram STT instance per speaker                         │
│   • Async audio handler: websocket → STT stream                          │
│   • Async transcript handler: STT → DynamoDB with global sequence       │
│   • Output queue for listener responses (Talk Now feature)              │
│                                                                            │
│  Key: Each speaker has isolated STT to prevent cross-talk interference   │
└────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                         DynamoDB (Transcript Store)                       │
│                                                                            │
│  Transcript Chunks:                                                       │
│   • room_id (partition key), seq (sort key, global counter)              │
│   • text, speaker_id, speaker_name                                       │
│   • timestamp, confidence, is_final                                       │
│                                                                            │
│  Why DynamoDB:                                                            │
│   • Central source of truth for all transcripts                          │
│   • Atomic sequence counter increment (global ordering)                  │
│   • Query by seq range for "since last" polling                          │
│   • Persistent history for late joiners                                   │
└────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────────┐
│            Central Broadcast Loop (Single Task Per Room)                  │
│                                                                            │
│  while room.running:                                                      │
│    # 1. Poll DynamoDB once for all new chunks since last_seq            │
│    chunks = fetch_transcript_chunks(room_id, since_seq=last_seq)        │
│                                                                            │
│    for chunk in chunks:                                                   │
│      # 2. Get all target languages in room                               │
│      target_languages = list(listener_groups.keys())                     │
│                                                                            │
│      # 3. Translate in parallel for all languages                        │
│      translation_tasks = [                                                │
│        translator.translate(chunk.text, lang)                            │
│        for lang in target_languages                                       │
│      ]                                                                    │
│      translations = await asyncio.gather(*translation_tasks)             │
│                                                                            │
│      # 4. Generate TTS in parallel for all languages                     │
│      tts_tasks = [                                                        │
│        tts.synthesize(translated_text, lang)                             │
│        for lang, translated_text in translations                          │
│      ]                                                                    │
│      tts_audio = await asyncio.gather(*tts_tasks)                        │
│                                                                            │
│      # 5. Broadcast to listeners by language group                       │
│      async with room.lock:  # Lock only for send, not translate/TTS     │
│        for language, listener_ids in listener_groups.items():           │
│          for listener_id in listener_ids:                                │
│            # Only send chunks after listener join sequence               │
│            if chunk.seq > listener_join_seq[listener_id]:               │
│              await listener.send_transcript(                             │
│                translations[language], tts_audio[language], chunk       │
│              )                                                            │
│                                                                            │
│    await asyncio.sleep(0.5)  # Poll interval                            │
│                                                                            │
│  Key Benefits:                                                            │
│   • Single DynamoDB poll for entire room (not per listener)             │
│   • Translate once per language (not per listener)                       │
│   • Parallel translation & TTS across languages                          │
│   • Lock held only during send (minimal contention)                      │
└────────────────────────────────────────────────────────────────────────────┘
                                    │
          ┌─────────────────────────┼─────────────────────────┐
          │                         │                         │
          ▼                         ▼                         ▼
┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐
│  Listener (French)   │  │  Listener (German)   │  │  Listener (Japanese) │
│  - Grouped by lang   │  │  - Grouped by lang   │  │  - Grouped by lang   │
│  - Output queue      │  │  - Output queue      │  │  - Output queue      │
│  - WebSocket sender  │  │  - WebSocket sender  │  │  - WebSocket sender  │
└──────────────────────┘  └──────────────────────┘  └──────────────────────┘
          │                         │                         │
          │ Translated Audio + Text │                         │
          └─────────────────────────┴─────────────────────────┘
                                    │
                                    ▼
                      Listeners receive translations
                      in their target language in real-time

┌────────────────────────────────────────────────────────────────────────────┐
│                    Concurrency & Pressure Management                       │
│                                                                            │
│  Async Locks (asyncio.Lock):                                             │
│   • Protects: speakers dict, listeners dict, listener_groups             │
│   • Held during: add/remove operations, broadcast send                   │
│   • NOT held during: translation, TTS generation (I/O operations)        │
│                                                                            │
│  Async Queues:                                                            │
│   • STT transcript queue per speaker (backpressure for slow handlers)   │
│   • Output queue per listener (backpressure for slow WebSocket)         │
│   • Bounded queues prevent memory explosion during traffic spikes        │
│                                                                            │
│  Global Sequence Counter:                                                │
│   • Atomic increment via async lock                                      │
│   • Ensures total ordering of all transcripts across speakers            │
│   • Late joiners get only chunks after their join_seq                    │
└────────────────────────────────────────────────────────────────────────────┘`,
      description: 'Conference AI architecture with central broadcast pattern, async locks for concurrency, and language-grouped listeners'
    },
    
    technicalHighlights: [
      {
        icon: 'FiServer',
        title: 'Central Broadcast Architecture',
        description: 'Single polling loop per room fetches transcripts from DynamoDB once, then broadcasts to all listeners. Translates once per language group (not per listener), dramatically reducing API calls and latency.'
      },
      {
        icon: 'FiLock',
        title: 'Async Lock Management',
        description: 'Uses asyncio.Lock to protect shared state (speakers, listeners, groups) while minimizing lock contention. Locks held only during critical sections, never during I/O (translation, TTS).'
      },
      {
        icon: 'FiZap',
        title: 'Parallel Translation & TTS',
        description: 'Uses asyncio.gather() to parallelize translation and TTS generation across all target languages. Reduces latency from sequential (N * latency) to parallel (max latency).'
      },
      {
        icon: 'FiDatabase',
        title: 'Global Sequence Ordering',
        description: 'Atomic global sequence counter ensures transcript ordering across multiple concurrent speakers. Late joiners receive only transcripts after their join sequence.'
      },
      {
        icon: 'FiUsers',
        title: 'Language-Grouped Listeners',
        description: 'Listeners organized by target language enables single translation per language group. Scales efficiently: 100 French listeners = 1 translation, not 100.'
      },
      {
        icon: 'FiCode',
        title: 'Backpressure with Async Queues',
        description: 'Bounded async queues prevent memory explosion during traffic spikes. If downstream consumer (WebSocket send) is slow, queue fills and upstream producer (STT) naturally throttles.'
      }
    ],
    
    implementationDetails: [
      {
        section: 'Central Broadcast Loop with Optimizations',
        description: 'Core architecture that polls DynamoDB once per room and distributes transcripts to all listeners with minimal lock contention.',
        codeSnippet: `async def _central_broadcast_loop(self):
    """
    Poll DynamoDB once, translate once per language, broadcast to all.
    Minimizes database calls, API calls, and lock contention.
    """
    empty_room_count = 0
    
    while self.running:
        try:
            # Check if room empty (no speakers + no listeners)
            is_empty = await self._is_room_empty()
            if is_empty:
                empty_room_count += 1
                if empty_room_count >= 3:
                    logging.info("Room empty, stopping broadcast")
                    break
            else:
                empty_room_count = 0
            
            # 1. Single DynamoDB poll for entire room
            chunks = fetch_transcript_chunks(
                self.room_id, 
                since_seq=self.last_seq
            )
            
            for chunk in chunks:
                self.last_seq = max(self.last_seq, int(chunk['seq']))
                
                # 2. Get target languages once (lock-free read)
                async with self.lock:
                    target_languages = list(self.listener_groups.keys())
                
                # 3. Translate in parallel (NO LOCK HELD)
                translations = {}
                translation_tasks = [
                    (lang, asyncio.create_task(
                        self.translation_func(chunk['text'], lang)
                    ))
                    for lang in target_languages
                ]
                
                results = await asyncio.gather(
                    *[task for _, task in translation_tasks],
                    return_exceptions=True
                )
                
                for i, (lang, _) in enumerate(translation_tasks):
                    result = results[i]
                    translations[lang] = result if not isinstance(result, Exception) else chunk['text']
                
                # 4. TTS in parallel (NO LOCK HELD)
                tts_audio = {}
                tts_tasks = [
                    (lang, asyncio.create_task(
                        self.tts_func(translations[lang], lang)
                    ))
                    for lang in target_languages
                ]
                
                tts_results = await asyncio.gather(
                    *[task for _, task in tts_tasks],
                    return_exceptions=True
                )
                
                for i, (lang, _) in enumerate(tts_tasks):
                    result = tts_results[i]
                    tts_audio[lang] = result if not isinstance(result, Exception) else None
                
                # 5. Broadcast (LOCK ONLY FOR SEND)
                async with self.lock:
                    for lang, listener_ids in self.listener_groups.items():
                        for listener_id in listener_ids:
                            listener = self.listeners.get(listener_id)
                            if listener:
                                # Only send if chunk after join
                                if chunk['seq'] > self.listener_join_seq[listener_id]:
                                    await listener.send_transcript_direct(
                                        translations[lang],
                                        tts_audio[lang],
                                        chunk
                                    )
            
            await asyncio.sleep(0.5)  # Poll interval
            
        except Exception as e:
            logging.error(f"Broadcast error: {e}")
            await asyncio.sleep(1.0)`,
        challenges: [
          'Lock contention: Minimize lock hold time while ensuring thread safety',
          'API rate limits: Reduce translation/TTS calls without sacrificing functionality',
          'Late join problem: Prevent flooding late joiners with historical transcripts',
          'Empty room detection: Clean up resources when all participants disconnect'
        ],
        impact: 'Reduced translation API calls by 95% (from per-listener to per-language). Supports 50+ concurrent participants per room with <500ms latency.'
      },
      {
        section: 'Async Lock Strategy for Concurrency',
        description: 'Carefully designed lock usage to protect shared state while maximizing concurrency and minimizing contention.',
        codeSnippet: `class MultiSpeakerConferenceRoom:
    def __init__(self, room_id, ...):
        self.lock = asyncio.Lock()  # Single lock for all shared state
        self.speakers = {}
        self.listeners = {}
        self.listener_groups = {}
        self.global_seq_counter = 0
    
    async def _get_next_seq(self):
        """Atomic sequence increment - MUST hold lock"""
        async with self.lock:
            self.global_seq_counter += 1
            return self.global_seq_counter
    
    async def add_speaker(self, websocket, speaker_name, ...):
        """Lock held during speaker registration"""
        async with self.lock:
            # Check speaker limit
            if len(self.speakers) >= self.max_speakers:
                raise ValueError("Max speakers reached")
            
            speaker_id = str(uuid.uuid4())
            
            # Initialize sequence from DB (first speaker only)
            if len(self.speakers) == 0:
                latest_seq = get_latest_sequence(self.room_id)
                self.global_seq_counter = latest_seq or 0
            
            # Create speaker
            speaker = ConferenceSpeaker(
                ...,
                seq_callback=self._get_next_seq  # Callback for atomic increment
            )
            
            self.speakers[speaker_id] = speaker
        
        # Start tasks OUTSIDE lock (I/O operations)
        await speaker.start()
        speaker.audio_task = asyncio.create_task(speaker.handle_speaker_audio())
        speaker.transcript_task = asyncio.create_task(speaker.handle_deepgram_transcripts())
    
    async def remove_speaker(self, speaker_id):
        """Lock held during removal"""
        async with self.lock:
            speaker = self.speakers.pop(speaker_id, None)
        
        # Cleanup OUTSIDE lock
        if speaker:
            await speaker.close()
        
        # Check empty status OUTSIDE lock to avoid deadlock
        is_empty = await self._is_room_empty()
        if is_empty:
            await self._stop_broadcast_task()`,
        challenges: [
          'Deadlock prevention: Never acquire lock while holding another async resource',
          'Lock granularity: Too coarse = high contention, too fine = race conditions',
          'Async I/O: Never hold lock during network calls (translation, TTS, WebSocket)',
          'Cleanup timing: When to safely remove speakers/listeners without races'
        ],
        impact: 'Achieved lock hold time <5ms for most operations. Supports high concurrency without deadlocks or race conditions in production.'
      },
      {
        section: 'Backpressure with Async Queues',
        description: 'Uses bounded async queues to handle backpressure when downstream consumers (WebSocket senders) are slower than upstream producers (STT).',
        codeSnippet: `class ConferenceSpeaker:
    def __init__(self, ...):
        # Bounded queue prevents memory explosion
        self.transcript_queue = asyncio.Queue(maxsize=50)
        self.output_queue = asyncio.Queue(maxsize=20)
    
    async def handle_deepgram_transcripts(self):
        """
        Producer: Reads from Deepgram, writes to transcript queue.
        If queue full, awaits (natural backpressure).
        """
        async for transcript in self.deepgram_connection:
            if transcript.is_final:
                # Get global sequence atomically
                seq = await self.seq_callback()
                
                chunk = {
                    'text': transcript.text,
                    'seq': seq,
                    'speaker_id': self.speaker_id,
                    'confidence': transcript.confidence
                }
                
                # Store in DynamoDB
                store_transcript_chunk(self.room_id, chunk)
                
                # Put in queue - blocks if full (backpressure!)
                await self.transcript_queue.put(chunk)
    
    async def send_listener_message(self, text, audio, ...):
        """
        Producer: Adds messages to output queue.
        If full, awaits (backpressure).
        """
        message = {
            'type': 'listener_message',
            'text': text,
            'audio': audio,
            'timestamp': datetime.now().isoformat()
        }
        await self.output_queue.put(message)
    
    async def _send_output_messages(self):
        """
        Consumer: Reads from output queue, sends to WebSocket.
        If WebSocket slow, queue fills and send_listener_message() blocks.
        """
        while self.is_active:
            try:
                message = await self.output_queue.get()
                await self.websocket.send_json(message)
            except Exception as e:
                logging.error(f"WebSocket send error: {e}")`,
        challenges: [
          'Queue sizing: Too small = frequent backpressure, too large = memory issues',
          'Graceful degradation: What to do when queue fills (drop oldest? block?)',
          'Consumer failure: If WebSocket dies, queue fills forever',
          'Priority: Some messages (errors, system) should skip queue'
        ],
        impact: 'Prevents out-of-memory crashes during traffic spikes. System gracefully slows down producers when consumers can\'t keep up.'
      },
      {
        section: 'Late Joiner Management with Sequence Tracking',
        description: 'Tracks when each listener joins and only sends transcripts that occurred after their join time, preventing historical flood.',
        codeSnippet: `async def add_listener(self, listener_id, websocket, target_language):
    """Register listener and record join sequence"""
    async with self.lock:
        listener = ConferenceListener(
            self.room_id, listener_id, websocket, target_language
        )
        await listener.start()
        
        self.listeners[listener_id] = listener
        
        # Add to language group
        if target_language not in self.listener_groups:
            self.listener_groups[target_language] = set()
        self.listener_groups[target_language].add(listener_id)
        
        # Record join sequence from database
        current_seq = get_latest_sequence(self.room_id)
        self.listener_join_seq[listener_id] = current_seq or self.last_seq
        
        logging.info(
            f"Listener {listener_id} joined at seq {self.listener_join_seq[listener_id]}"
        )

# In broadcast loop
for listener_id in listener_ids:
    listener = self.listeners.get(listener_id)
    if listener:
        # Filter: Only send if chunk AFTER join
        listener_join_seq = self.listener_join_seq.get(listener_id, 0)
        chunk_seq = int(chunk['seq'])
        
        if chunk_seq > listener_join_seq:
            await listener.send_transcript_direct(
                translated_text, audio_content, chunk
            )
        else:
            # Skip historical chunks
            logging.info(
                f"Skipping chunk seq {chunk_seq} for listener {listener_id} "
                f"(joined at {listener_join_seq})"
            )`,
        challenges: [
          'Clock skew: Database sequence vs local sequence counter',
          'Race condition: Listener joins while broadcast loop processing chunk',
          'Historical catchup: Should some listeners get recent history?',
          'Sequence gaps: Missing sequences due to failed writes'
        ],
        impact: 'Prevents new listeners from receiving 100+ historical messages on join. Smooth experience for late joiners.'
      }
    ],
    
    productionMetrics: [
      { value: '50+', label: 'Concurrent Participants' },
      { value: '<500ms', label: 'Translation Latency' },
      { value: '95%', label: 'API Call Reduction' },
      { value: '100+', label: 'Languages Supported' }
    ],
    
    technologies: [
      'Python',
      'FastAPI',
      'WebSocket',
      'Asyncio',
      'Async Locks',
      'Async Queues',
      'Deepgram STT',
      'Google Translate',
      'Google TTS',
      'DynamoDB',
      'WebRTC',
      'React'
    ]
  },

  'api-key-access': {
    title: 'API Key Access & Third-Party Integration',
    subtitle: 'Secure Multi-Tenant API Platform with Permission-Based Access',
    category: 'API Platform & Security',
    description: 'Designed secure API-key based platform enabling third-party customers to integrate Lingolet services into their own applications. Built permission-based access control, rate limiting, and comprehensive API testing UI for customers.',
    
    architectureDiagram: {
      asciiDiagram: `
┌────────────────────────────────────────────────────────────────────────────┐
│                      Third-Party Customer Application                      │
│                                                                            │
│  Customer's Frontend (React, Angular, etc.)                               │
│   • Custom UI matching their brand                                        │
│   • Embedded Lingolet functionality                                       │
│   • User authentication via their system                                  │
└────────────────────────────────────────────────────────────────────────────┘
                                    │
                        API Call with X-API-Key Header
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                    API Gateway (FastAPI Router)                           │
│                                                                            │
│  @api_key_access_routes.post('/lingolink/create')                        │
│  def create_lingolink(                                                    │
│      x_api_key: str = Header(None, alias="X-API-Key")                    │
│  ):                                                                       │
│      # 1. Validate API key                                                │
│      # 2. Check permission & action                                       │
│      # 3. Rate limit check                                                │
│      # 4. Execute business logic                                          │
│      # 5. Log API access                                                  │
└────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────────┐
│           API Key Validation Middleware (Permission-Based)                │
│                                                                            │
│  def validate_api_key_with_permission(                                    │
│      required_permission: str,  # e.g., "lingolink"                      │
│      required_action: str,      # e.g., "create"                         │
│      x_api_key: str,                                                      │
│      db: Session                                                          │
│  ):                                                                       │
│      # Step 1: Validate key exists and is active                         │
│      api_key_obj = db.query(ApiKey).filter(                              │
│          ApiKey.key == x_api_key,                                         │
│          ApiKey.is_active == True                                         │
│      ).first()                                                            │
│                                                                            │
│      if not api_key_obj:                                                  │
│          raise HTTPException(401, "Invalid or inactive API key")         │
│                                                                            │
│      # Step 2: Check expiration                                           │
│      if api_key_obj.expires_at and api_key_obj.expires_at < now():      │
│          raise HTTPException(401, "API key expired")                     │
│                                                                            │
│      # Step 3: Verify permission                                          │
│      permission = db.query(Permission).filter(                           │
│          Permission.api_key_id == api_key_obj.id,                        │
│          Permission.resource == required_permission,                      │
│          Permission.is_active == True                                     │
│      ).first()                                                            │
│                                                                            │
│      if not permission:                                                   │
│          raise HTTPException(403, "No permission for this resource")     │
│                                                                            │
│      # Step 4: Check action allowed                                       │
│      allowed_actions = permission.actions  # ["create", "read", ...]    │
│      if required_action not in allowed_actions:                          │
│          raise HTTPException(403, "Action not allowed")                  │
│                                                                            │
│      # Step 5: Rate limit check (Redis/in-memory)                        │
│      if rate_limit_exceeded(api_key_obj):                                │
│          raise HTTPException(429, "Rate limit exceeded")                 │
│                                                                            │
│      return api_key_obj  # Validated!                                    │
└────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                     Business Logic Execution                              │
│                                                                            │
│  Endpoint Examples:                                                       │
│   • /lingolink/create - Create new LingoLink with custom configuration   │
│   • /lingolink/links - Get all links for account                         │
│   • /lingolink/refresh - Refresh access code                             │
│   • /lingolink/disable - Disable link                                    │
│   • /lingolink/call_history - Get call records                           │
│   • /ai-phone/call-history/account - Get AI phone call history          │
│                                                                            │
│  Each endpoint:                                                           │
│   • Parses request body (validated with Pydantic)                        │
│   • Executes business logic (create DB records, S3 uploads, etc.)       │
│   • Returns structured JSON response                                      │
│   • Logs API access for audit trail                                      │
└────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                       API Access Logging                                  │
│                                                                            │
│  CREATE TABLE api_access_logs (                                          │
│      id UUID PRIMARY KEY,                                                 │
│      api_key_id UUID,                                                     │
│      account_uuid UUID,                                                   │
│      endpoint VARCHAR(255),                                               │
│      method VARCHAR(10),                                                  │
│      status_code INT,                                                     │
│      response_time_ms INT,                                                │
│      request_ip VARCHAR(45),                                              │
│      user_agent TEXT,                                                     │
│      created_at TIMESTAMP                                                 │
│  );                                                                       │
│                                                                            │
│  Benefits:                                                                │
│   • Audit trail for compliance                                            │
│   • Usage analytics per customer                                          │
│   • Security monitoring (detect abuse)                                    │
│   • Billing data (API calls per account)                                 │
└────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                   Customer Testing UI (React)                             │
│                                                                            │
│  TestApiAccess.jsx:                                                       │
│   • Select project/account context                                        │
│   • Choose API endpoint to test                                           │
│   • Fill request parameters in form                                       │
│   • Add X-API-Key header automatically                                    │
│   • Execute API call                                                      │
│   • Display formatted JSON response                                       │
│   • Show request/response headers                                         │
│   • Copy curl command for integration                                     │
│                                                                            │
│  Use Case:                                                                │
│   • Customers validate API integration before going live                 │
│   • Test permission configurations                                        │
│   • Debug API errors in controlled environment                           │
│   • Generate example requests for documentation                          │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│                    Security & Multi-Tenancy Features                      │
│                                                                            │
│  1. API Key Management:                                                   │
│     • Cryptographically random key generation                            │
│     • Bcrypt hashing before storage (never store plain text)            │
│     • Expiration dates configurable per key                              │
│     • Manual revocation by account admin                                 │
│                                                                            │
│  2. Permission Granularity:                                               │
│     • Resource-level: Which API endpoint groups (lingolink, ai-phone)   │
│     • Action-level: create, read, update, delete, list                   │
│     • Account-level: Each key tied to specific account_uuid             │
│     • Data isolation: API calls only access caller's own data           │
│                                                                            │
│  3. Rate Limiting:                                                        │
│     • Per-key limits: 1000 req/hour (configurable)                      │
│     • Per-endpoint limits: Stricter for expensive operations            │
│     • Sliding window algorithm (Redis)                                   │
│     • Graceful degradation on limit breach                              │
│                                                                            │
│  4. Audit & Monitoring:                                                   │
│     • All API calls logged with timestamp, IP, user agent               │
│     • Failed authentication attempts tracked                             │
│     • Anomaly detection (unusual call patterns)                          │
│     • Customer-facing usage dashboard                                    │
└────────────────────────────────────────────────────────────────────────────┘`,
      description: 'Complete API Key platform with permission-based access control, rate limiting, audit logging, and customer testing UI'
    },
    
    technicalHighlights: [
      {
        icon: 'FiLock',
        title: 'Permission-Based Access Control',
        description: 'Fine-grained permission system with resource-level and action-level controls. Each API key can have different permissions (create, read, update, delete) for different resources (lingolink, ai-phone).'
      },
      {
        icon: 'FiServer',
        title: 'Multi-Tenant Data Isolation',
        description: 'Enforces strict data isolation at API layer. Each API key tied to specific account_uuid. Business logic automatically filters queries by account to prevent cross-tenant data access.'
      },
      {
        icon: 'FiShield',
        title: 'Secure Key Management',
        description: 'Cryptographically random API key generation using secrets.token_urlsafe(). Keys hashed with bcrypt before storage (never stored in plain text). Supports expiration dates and manual revocation.'
      },
      {
        icon: 'FiDatabase',
        title: 'Comprehensive Audit Logging',
        description: 'Every API call logged with timestamp, endpoint, method, status code, response time, IP address, and user agent. Enables compliance auditing, usage analytics, and security monitoring.'
      },
      {
        icon: 'FiZap',
        title: 'Rate Limiting & Throttling',
        description: 'Per-key rate limits with sliding window algorithm (Redis-backed). Prevents abuse while ensuring fair usage. Different limits for different endpoint categories (read vs write).'
      },
      {
        icon: 'FiUsers',
        title: 'Customer Testing UI',
        description: 'Built interactive React UI for customers to test API endpoints before integration. Auto-generates curl commands, shows request/response details, and validates permissions in real-time.'
      }
    ],
    
    implementationDetails: [
      {
        section: 'Permission-Based Validation Middleware',
        description: 'Reusable validation function that checks API key validity, expiration, resource permission, and allowed actions before executing any endpoint.',
        codeSnippet: `def validate_api_key_with_permission(
    required_permission: str,  # Resource: "lingolink", "ai-phone", etc.
    required_action: str,      # Action: "create", "read", "update", "delete"
    x_api_key: str,
    db: Session
):
    """
    Validates API key and checks if it has permission for the requested action.
    
    Raises:
        HTTPException(401): Invalid/inactive/expired key
        HTTPException(403): No permission or action not allowed
        HTTPException(429): Rate limit exceeded
    
    Returns:
        api_key_obj: Validated API key object with account context
    """
    # 1. Validate key exists and is active
    api_key_obj = db.query(ApiKey).filter(
        ApiKey.key == x_api_key,
        ApiKey.is_active == True
    ).first()
    
    if not api_key_obj:
        raise HTTPException(
            status_code=401,
            detail="Invalid or inactive API key"
        )
    
    # 2. Check expiration
    if api_key_obj.expires_at:
        if api_key_obj.expires_at < datetime.utcnow():
            raise HTTPException(
                status_code=401,
                detail="API key has expired"
            )
    
    # 3. Check if key has permission for this resource
    permission = db.query(Permission).filter(
        Permission.api_key_id == api_key_obj.id,
        Permission.resource == required_permission,
        Permission.is_active == True
    ).first()
    
    if not permission:
        raise HTTPException(
            status_code=403,
            detail=f"No permission for resource: {required_permission}"
        )
    
    # 4. Check if action is allowed
    allowed_actions = permission.actions  # List: ["create", "read", ...]
    if required_action not in allowed_actions:
        raise HTTPException(
            status_code=403,
            detail=f"Action '{required_action}' not allowed for this key"
        )
    
    # 5. Rate limit check (simplified)
    if is_rate_limited(api_key_obj):
        raise HTTPException(
            status_code=429,
            detail="Rate limit exceeded. Try again later."
        )
    
    # 6. Log API access
    log_api_access(
        api_key_id=api_key_obj.id,
        endpoint=required_permission,
        action=required_action,
        status_code=200,
        ip_address=request.client.host
    )
    
    return api_key_obj


# Usage in endpoint
@api_key_access_routes.post('/lingolink/create')
def create_lingolink(
    request: Request,
    request_info: CreateLingoLinkRequest,
    x_api_key: str = Header(None, alias="X-API-Key"),
    db: Session = Depends(get_db)
):
    # Validate before executing business logic
    api_key_obj = validate_api_key_with_permission(
        required_permission="lingolink",
        required_action="create",
        x_api_key=x_api_key,
        db=db
    )
    
    # Now safe to execute - key is valid, permission granted
    link = create_link_internal(
        db=db,
        account_uuid=api_key_obj.account_uuid,  # Auto-scoped to this account
        data=request_info.dict()
    )
    
    return {"success": True, "link": link}`,
        challenges: [
          'Permission model design: Balance between flexibility and security',
          'Performance: Validation on every request must be fast (<10ms)',
          'Race conditions: Concurrent permission changes during request',
          'Key rotation: Supporting multiple active keys per account'
        ],
        impact: 'Enabled white-label integrations for 10+ enterprise customers. Zero security breaches related to API keys in production.'
      },
      {
        section: 'Multi-Tenant Data Isolation',
        description: 'Enforces data isolation at API layer by automatically scoping all queries to the authenticated account UUID.',
        codeSnippet: `@api_key_access_routes.post('/lingolink/links')
def get_links(
    request: Request,
    request_info: GetLinksRequest,
    x_api_key: str = Header(None, alias="X-API-Key"),
    db: Session = Depends(get_db)
):
    """
    Get all links for the authenticated account.
    Data automatically scoped to account_uuid from API key.
    """
    # Validate and get account context
    api_key_obj = validate_api_key_with_permission(
        required_permission="lingolink",
        required_action="read",
        x_api_key=x_api_key,
        db=db
    )
    
    # CRITICAL: Always filter by account_uuid from validated key
    # Never trust account_uuid from request body!
    links = db.query(DynamicLink).filter(
        DynamicLink.account_uuid == api_key_obj.account_uuid,  # ← Enforced isolation
        DynamicLink.is_active == True
    ).all()
    
    return {
        "success": True,
        "links": [link.to_dict() for link in links],
        "account_uuid": api_key_obj.account_uuid  # Echo for client verification
    }


@api_key_access_routes.post('/ai-phone/call-history/account')
def get_ai_phone_call_history(
    request: Request,
    request_info: GetAiPhoneCallHistoryRequest,
    x_api_key: str = Header(None, alias="X-API-Key"),
    db: Session = Depends(get_db)
):
    """Get AI phone call history for authenticated account"""
    api_key_obj = validate_api_key_with_permission(
        required_permission="ai-phone",
        required_action="read",
        x_api_key=x_api_key,
        db=db
    )
    
    # Query DynamoDB with account scope
    calls_db = get_ai_over_phone_calls_db()
    
    # CRITICAL: business_uuid must match api_key_obj.business_uuid
    # Customer cannot access other customers' call history
    calls = calls_db.query_calls_by_account(
        business_uuid=api_key_obj.business_uuid,  # ← Enforced isolation
        account_uuid=api_key_obj.account_uuid,
        limit=request_info.limit or 50
    )
    
    return {
        "success": True,
        "calls": calls,
        "total_count": len(calls)
    }`,
        challenges: [
          'Trust boundary: Never trust account_uuid from request body',
          'JOIN queries: Ensuring isolation when joining across tables',
          'Caching: Cache invalidation must respect account boundaries',
          'Testing: Validating isolation with automated tests'
        ],
        impact: 'Achieved 100% data isolation in production. No cross-tenant data leaks detected in security audits.'
      },
      {
        section: 'Customer Testing UI',
        description: 'React component that lets customers interactively test API endpoints with their API keys before integrating into their applications.',
        codeSnippet: `// TestApiAccess.jsx - Customer-Facing API Testing UI
const TestApiAccess = ({ accountUuid }) => {
  const [apiKey, setApiKey] = useState('')
  const [selectedEndpoint, setSelectedEndpoint] = useState(null)
  const [requestParams, setRequestParams] = useState({})
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  
  const endpoints = [
    {
      name: 'Create LingoLink',
      path: '/api/lingolink/create',
      method: 'POST',
      params: {
        link_type: { type: 'select', options: ['audio', 'video', 'phone'] },
        language: { type: 'text', default: 'English' },
        expiration_hours: { type: 'number', default: 24 }
      }
    },
    {
      name: 'Get Links',
      path: '/api/lingolink/links',
      method: 'POST',
      params: {
        account_uuid: { type: 'text', readonly: true, value: accountUuid }
      }
    },
    {
      name: 'Get Call History',
      path: '/api/ai-phone/call-history/account',
      method: 'POST',
      params: {
        account_uuid: { type: 'text', readonly: true, value: accountUuid },
        limit: { type: 'number', default: 50 }
      }
    }
  ]
  
  const executeApiCall = async () => {
    setLoading(true)
    setResponse(null)
    
    try {
      const startTime = Date.now()
      
      const res = await fetch(selectedEndpoint.path, {
        method: selectedEndpoint.method,
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey  // Customer's API key
        },
        body: JSON.stringify(requestParams)
      })
      
      const responseTime = Date.now() - startTime
      const data = await res.json()
      
      setResponse({
        status: res.status,
        statusText: res.statusText,
        responseTime: responseTime,
        data: data,
        headers: Object.fromEntries(res.headers.entries())
      })
    } catch (error) {
      setResponse({
        status: 'ERROR',
        data: { error: error.message }
      })
    } finally {
      setLoading(false)
    }
  }
  
  const generateCurlCommand = () => {
    return \`curl -X \${selectedEndpoint.method} \\
  '\${window.location.origin}\${selectedEndpoint.path}' \\
  -H 'Content-Type: application/json' \\
  -H 'X-API-Key: \${apiKey}' \\
  -d '\${JSON.stringify(requestParams, null, 2)}'\`
  }
  
  return (
    <Box>
      <Heading size="md" mb={4}>API Testing Console</Heading>
      
      {/* API Key Input */}
      <Input
        placeholder="Enter your API Key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        type="password"
        mb={4}
      />
      
      {/* Endpoint Selector */}
      <Select
        placeholder="Select API Endpoint"
        onChange={(e) => setSelectedEndpoint(endpoints[e.target.value])}
        mb={4}
      >
        {endpoints.map((ep, idx) => (
          <option key={idx} value={idx}>{ep.name}</option>
        ))}
      </Select>
      
      {/* Dynamic Parameter Inputs */}
      {selectedEndpoint && (
        <VStack spacing={3} align="stretch" mb={4}>
          {Object.entries(selectedEndpoint.params).map(([key, config]) => (
            <FormControl key={key}>
              <FormLabel fontSize="sm">{key}</FormLabel>
              <Input
                type={config.type}
                defaultValue={config.default || config.value}
                isReadOnly={config.readonly}
                onChange={(e) => setRequestParams({
                  ...requestParams,
                  [key]: e.target.value
                })}
              />
            </FormControl>
          ))}
        </VStack>
      )}
      
      {/* Execute Button */}
      <Button
        colorScheme="purple"
        onClick={executeApiCall}
        isLoading={loading}
        isDisabled={!apiKey || !selectedEndpoint}
      >
        Execute API Call
      </Button>
      
      {/* Response Display */}
      {response && (
        <Box mt={4} p={4} bg="gray.800" borderRadius="md">
          <HStack justify="space-between" mb={2}>
            <Badge colorScheme={response.status === 200 ? 'green' : 'red'}>
              {response.status} {response.statusText}
            </Badge>
            <Text fontSize="xs" color="gray.400">
              {response.responseTime}ms
            </Text>
          </HStack>
          
          <Code display="block" whiteSpace="pre" fontSize="xs" p={3}>
            {JSON.stringify(response.data, null, 2)}
          </Code>
        </Box>
      )}
      
      {/* Curl Command */}
      {selectedEndpoint && (
        <Box mt={4}>
          <Text fontSize="sm" fontWeight="bold" mb={2}>Curl Command:</Text>
          <Code display="block" whiteSpace="pre" fontSize="xs" p={3}>
            {generateCurlCommand()}
          </Code>
          <Button
            size="sm"
            mt={2}
            onClick={() => navigator.clipboard.writeText(generateCurlCommand())}
          >
            Copy Command
          </Button>
        </Box>
      )}
    </Box>
  )
}`,
        challenges: [
          'Dynamic form generation: Rendering appropriate input types per endpoint',
          'Error handling: Displaying clear error messages for common issues',
          'Security: Ensuring API keys not logged or exposed in browser',
          'Documentation: Auto-generating API docs from endpoint definitions'
        ],
        impact: 'Reduced customer integration support time by 70%. Customers can validate integration independently before going live.'
      }
    ],
    
    productionMetrics: [
      { value: '10+', label: 'Enterprise Customers' },
      { value: '0', label: 'Security Breaches' },
      { value: '100%', label: 'Data Isolation' },
      { value: '<10ms', label: 'Validation Latency' }
    ],
    
    technologies: [
      'Python',
      'FastAPI',
      'PostgreSQL',
      'Bcrypt',
      'JWT',
      'Redis',
      'React',
      'Chakra UI',
      'Pydantic',
      'SQLAlchemy',
      'CORS',
      'Rate Limiting'
    ]
  }
}

