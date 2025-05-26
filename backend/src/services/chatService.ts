const COMPANY_KNOWLEDGE = `
Company Name: Global Wander
Business Type: Full-Service Travel Agency
Established: Over 15 years in the travel industry
Mission: To create unforgettable travel experiences tailored to every traveler's needs and budget

SERVICES WE OFFER:
- Vacation Packages (All-Inclusive, Luxury, Budget)
- Flight Bookings & Airfare Deals
- Hotel & Resort Reservations
- Car Rentals & Transportation
- Cruise Packages
- Group Travel Planning
- Family Vacation Packages
- Honeymoon & Romantic Getaways
- Adventure Travel
- Business Travel Services
- Travel Insurance
- 24/7 Customer Support
- Multilingual Travel Consultants

PACKAGE DETAILS:

VACATION PACKAGES:
Budget Package ($800 - $1,500 per person):
- Economy flights
- 3-star accommodations
- Basic transfers
- Self-guided touring options

Standard Package ($1,500 - $3,000 per person):
- Premium economy flights
- 4-star accommodations
- Private transfers
- Some guided tours
- Breakfast included

Premium Package ($3,000 - $10,000+ per person):
- Business class flights
- 5-star luxury accommodations
- Private chauffeur service
- Personalized guided experiences
- Dining credits
- VIP amenities

CRUISE PACKAGES:
Interior Cabin ($500 - $1,200 per person):
- Basic cruise cabin
- All onboard meals
- Standard entertainment

Oceanview Cabin ($1,200 - $2,500 per person):
- Window or porthole cabin
- All onboard meals + some specialty dining
- Premium entertainment access

Suite ($2,500 - $7,000+ per person):
- Luxury suite accommodations
- Butler service
- Premium dining package
- Spa credits
- Priority boarding

CONTACT INFORMATION:
- Office Hours: Monday to Friday, 9:00 AM to 7:00 PM; Saturday 10:00 AM to 4:00 PM
- Email: bookings@globalwanderlust.com
- Phone: +1-800-TRAVEL-NOW
- Emergency Contact: +1-800-555-HELP
- Office Location: 456 Explorer's Way, Downtown

FREQUENTLY ASKED QUESTIONS:

Q: What documents do I need for international travel?
A: Valid passport (6+ months validity), visas if required, vaccination certificates if needed, and travel insurance is recommended.

Q: When should I book my vacation package?
A: For best prices and availability, we recommend booking 6-9 months in advance for peak seasons, 3-6 months for regular travel.

Q: What's included in your flight booking service?
A: Complete flight search, price comparison, seat selection assistance, and ongoing support for changes or issues.

Q: Can I customize my package?
A: Absolutely! We specialize in creating tailor-made itineraries to match your preferences and budget.

Q: What if I need to cancel my booking?
A: Cancellation policies vary by provider. Generally, 90+ days before departure: 10% penalty, 60-89 days: 25% penalty, 30-59 days: 50% penalty, less than 30 days: case-by-case basis.

Q: Do you provide group discounts?
A: Yes, we offer special rates for groups of 8 or more travelers, with additional perks for larger groups.

Q: What health precautions should I consider?
A: We recommend checking CDC and WHO guidelines for your destination, ensuring routine vaccinations are up to date, and considering travel insurance with medical coverage.

Q: Is travel insurance included?
A: Travel insurance can be added to any package. We highly recommend it for international trips.

Q: What about special needs or accessibility requirements?
A: We can arrange wheelchair-accessible accommodations, special dietary meals, and other needs with advance notice.

Q: How experienced are your travel consultants?
A: Our team averages 7+ years in the travel industry, with personal experience visiting many of our offered destinations.

PAYMENT OPTIONS:
- Flexible payment plans available
- All major credit cards accepted
- Bank transfers
- Cash payments at office
- Early booking discounts (book 6+ months early)
- Last-minute deals available

SPECIAL SERVICES:
- Honeymoon registry
- Private tour guides
- Concierge services
- Airport lounge access
- VIP fast-track through customs
- Emergency travel assistance
`;

interface OllamaResponse {
  model: string;
  created_at: string;
  message: {
    role: string;
    content: string;
  };
  done: boolean;
}

export const getChatResponse = async (message: string): Promise<string> => {
  try {
    const systemPrompt = `You are a knowledgeable and enthusiastic customer support assistant for Global Wander, a full-service travel agency.

Use this knowledge to answer questions accurately: ${COMPANY_KNOWLEDGE}

RESPONSE FORMATTING RULES:
- Use line breaks and bullet points for better readability
- Structure your responses with clear sections when appropriate
- Use "•" for bullet points
- Add blank lines between different topics or sections
- Format prices clearly with currency symbols
- Make lists easy to scan

COMMUNICATION GUIDELINES:
- Be friendly, professional, and excited about travel
- Show genuine interest in helping clients plan their perfect trip
- Use positive language that inspires wanderlust
- Be patient and thorough in explaining travel requirements
- Answer based on the company information provided
- If asked about something not covered in our services, say "Let me connect you with one of our travel specialists for detailed information"
- For complex destination questions, suggest official tourism resources
- Always end responses with an offer to help further

RESPONSE STRUCTURE:
- Start with a warm greeting or acknowledgment
- Provide the main information in organized, readable format
- Include relevant pricing when applicable
- End with next steps or additional assistance offer

Remember: You're helping people create memorable travel experiences. Be informative, enthusiastic, and supportive.`;

    const response = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3.2',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: message
          }
        ],
        stream: false,
        options: {
          temperature: 0.8,
          top_p: 0.9,
          max_tokens: 500,
          num_predict: 500
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
    }

    const data: OllamaResponse = await response.json();
    
    return data.message?.content || "I'm sorry, I couldn't generate a response. Please try again.";
    
  } catch (error) {
    console.error("Ollama API error:", error);
    
    // Check if Ollama is running
    if (error instanceof Error && error.message.includes('ECONNREFUSED')) {
      return "I'm currently offline. Please make sure Ollama is running and try again.\n\nIf the issue persists, please contact our office:\n• Phone: +1-800-TRAVEL-NOW\n• Email: bookings@globalwanderlust.com\n• Office Hours: Mon-Fri 9 AM - 7 PM, Sat 10 AM - 4 PM";
    }
    
    return "I'm having trouble processing your request right now.\n\nPlease try again in a moment, or contact us directly:\n• Phone: +1-800-TRAVEL-NOW\n• Email: bookings@globalwanderlust.com\n\nOur travel experts are ready to help you plan your dream vacation!";
  }
};