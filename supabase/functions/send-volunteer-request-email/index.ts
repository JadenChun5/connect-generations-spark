import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface VolunteerRequestEmail {
  volunteerName: string;
  volunteerEmail: string;
  volunteerPhone: string;
  seniorName: string;
  seniorCenterName: string;
  seniorCenterEmail: string;
  date: string;
  startTime: string;
  endTime: string;
  activityType?: string;
  dashboardUrl: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData: VolunteerRequestEmail = await req.json();
    console.log("📧 Sending volunteer request email:", requestData);

    // Validate required fields
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured. Please add it to edge function secrets.');
    }

    if (!requestData.seniorCenterEmail) {
      throw new Error('Senior center email is required');
    }

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    const formatTime = (timeString: string) => {
      const time = new Date(`1970-01-01T${timeString}`);
      return time.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    };

    const emailSubject = `New Volunteer Request - ${formatDate(requestData.date)} at ${formatTime(requestData.startTime)}`;
    
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h1 style="color: #2563eb; margin: 0 0 10px 0;">🔔 New Volunteer Request</h1>
          <p style="color: #6b7280; margin: 0;">A new volunteer has signed up to help at your center!</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="color: #1f2937; margin-top: 0;">Volunteer Details</h2>
          
          <div style="margin-bottom: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Volunteer:</td>
                <td style="padding: 8px 0; color: #6b7280;">${requestData.volunteerName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
                <td style="padding: 8px 0; color: #6b7280;">${requestData.volunteerEmail}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Phone:</td>
                <td style="padding: 8px 0; color: #6b7280;">${requestData.volunteerPhone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Date:</td>
                <td style="padding: 8px 0; color: #6b7280;">${formatDate(requestData.date)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Time:</td>
                <td style="padding: 8px 0; color: #6b7280;">${formatTime(requestData.startTime)} - ${formatTime(requestData.endTime)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Senior:</td>
                <td style="padding: 8px 0; color: #6b7280;">${requestData.seniorName}</td>
              </tr>
              ${requestData.activityType ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Activity:</td>
                <td style="padding: 8px 0; color: #6b7280;">${requestData.activityType}</td>
              </tr>
              ` : ''}
            </table>
          </div>
          
          <div style="margin-top: 30px; text-align: center;">
            <p style="color: #6b7280; margin-bottom: 20px;">Please log into your dashboard to approve or decline this request.</p>
            <a href="${requestData.dashboardUrl}" 
               style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Go to Dashboard
            </a>
          </div>
        </div>
        
        <div style="margin-top: 20px; padding: 20px; background-color: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
          <p style="margin: 0; color: #92400e;">
            <strong>⚠️ Action Required:</strong> This request is pending your approval. Please review and respond as soon as possible.
          </p>
        </div>
        
        <div style="margin-top: 20px; text-align: center; color: #6b7280; font-size: 14px;">
          <p>Best regards,<br>The ${requestData.seniorCenterName} Volunteer Management System</p>
        </div>
      </div>
    `;

    // Send email using Resend API directly
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: "Volunteer System <noreply@resend.dev>",
        to: [requestData.seniorCenterEmail],
        subject: emailSubject,
        html: emailHtml,
      }),
    });

    const emailResult = await emailResponse.json();
    
    if (!emailResponse.ok) {
      console.error("❌ Resend API error:", emailResult);
      throw new Error(`Resend API failed: ${emailResult.message || 'Unknown error'}`);
    }
    
    console.log("✅ Email sent successfully:", emailResult);

    return new Response(JSON.stringify(emailResult), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("❌ Error in send-volunteer-request-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        hint: error.message.includes('RESEND_API_KEY') 
          ? 'Configure RESEND_API_KEY in Supabase Edge Function secrets'
          : 'Check edge function logs for details'
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);