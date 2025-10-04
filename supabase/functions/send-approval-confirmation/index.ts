import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ApprovalConfirmationEmail {
  teenName: string;
  teenEmail: string;
  seniorName: string;
  seniorCenterName: string;
  seniorCenterAddress: string;
  seniorCenterPhone: string;
  date: string;
  startTime: string;
  endTime: string;
  requirements: {
    health_requirements?: string;
    dress_code?: string;
    general_expectations?: string;
    safety_notes?: string;
  };
  activityType?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData: ApprovalConfirmationEmail = await req.json();
    console.log("📧 Sending approval confirmation email:", requestData);

    // Validate required fields
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured. Please add it to edge function secrets.');
    }

    if (!requestData.teenEmail) {
      throw new Error('Teen email is required');
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

    const emailSubject = "Your volunteer request has been approved! 🎉";
    
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #dcfce7; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #16a34a;">
          <h1 style="color: #15803d; margin: 0 0 10px 0;">🎉 Your volunteer request has been approved!</h1>
          <p style="color: #166534; margin: 0;">Hi ${requestData.teenName}, great news about your volunteer opportunity!</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #1f2937; margin-top: 0;">📅 Volunteer Details</h2>
          
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">📅 Date:</td>
                <td style="padding: 8px 0; color: #6b7280;">${formatDate(requestData.date)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">🕐 Time:</td>
                <td style="padding: 8px 0; color: #6b7280;">${formatTime(requestData.startTime)} - ${formatTime(requestData.endTime)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">🏢 Location:</td>
                <td style="padding: 8px 0; color: #6b7280;">${requestData.seniorCenterName}<br><small>${requestData.seniorCenterAddress}</small></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">👤 You'll be visiting:</td>
                <td style="padding: 8px 0; color: #6b7280;">${requestData.seniorName}</td>
              </tr>
              ${requestData.activityType ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">🎯 Activity:</td>
                <td style="padding: 8px 0; color: #6b7280;">${requestData.activityType}</td>
              </tr>
              ` : ''}
            </table>
          </div>
        </div>

        ${(requestData.requirements.health_requirements || requestData.requirements.dress_code || requestData.requirements.general_expectations || requestData.requirements.safety_notes) ? `
        <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #f59e0b;">
          <h3 style="color: #92400e; margin-top: 0;">⚠️ Requirements to Remember</h3>
          
          ${requestData.requirements.health_requirements ? `
          <div style="margin-bottom: 15px;">
            <h4 style="color: #92400e; margin: 0 0 5px 0;">🏥 Health Requirements:</h4>
            <p style="color: #a16207; margin: 0; font-size: 14px;">${requestData.requirements.health_requirements}</p>
          </div>
          ` : ''}
          
          ${requestData.requirements.dress_code ? `
          <div style="margin-bottom: 15px;">
            <h4 style="color: #92400e; margin: 0 0 5px 0;">👔 Dress Code:</h4>
            <p style="color: #a16207; margin: 0; font-size: 14px;">${requestData.requirements.dress_code}</p>
          </div>
          ` : ''}
          
          ${requestData.requirements.general_expectations ? `
          <div style="margin-bottom: 15px;">
            <h4 style="color: #92400e; margin: 0 0 5px 0;">📋 General Requirements:</h4>
            <p style="color: #a16207; margin: 0; font-size: 14px;">${requestData.requirements.general_expectations}</p>
          </div>
          ` : ''}
          
          ${requestData.requirements.safety_notes ? `
          <div style="margin-bottom: 15px;">
            <h4 style="color: #92400e; margin: 0 0 5px 0;">⚠️ Important Safety Notes:</h4>
            <p style="color: #a16207; margin: 0; font-size: 14px;">${requestData.requirements.safety_notes}</p>
          </div>
          ` : ''}
        </div>
        ` : ''}

        <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #3b82f6;">
          <h3 style="color: #1d4ed8; margin-top: 0;">🗺️ Getting There</h3>
          <p style="color: #1e40af; margin: 0 0 10px 0;"><strong>${requestData.seniorCenterName}</strong></p>
          <p style="color: #3730a3; margin: 0 0 15px 0;">${requestData.seniorCenterAddress}</p>
          <a href="https://maps.google.com/?q=${encodeURIComponent(requestData.seniorCenterAddress)}" 
             style="display: inline-block; background-color: #3b82f6; color: white; padding: 8px 16px; text-decoration: none; border-radius: 4px; font-size: 14px;">
            🗺️ Get Directions
          </a>
        </div>

        <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #22c55e;">
          <p style="color: #15803d; margin: 0; font-size: 16px;">
            <strong>Thank you for volunteering!</strong> ${requestData.seniorName} is looking forward to meeting you.
          </p>
        </div>

        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p style="color: #475569; margin: 0 0 10px 0;">
            <strong>Questions?</strong> Reply to this email or call ${requestData.seniorCenterPhone}.
          </p>
          <p style="color: #64748b; margin: 0; font-size: 14px;">
            <strong>P.S.</strong> Don't forget to check in at the front desk when you arrive!
          </p>
        </div>
        
        <div style="margin-top: 20px; text-align: center; color: #6b7280; font-size: 14px;">
          <p>Best regards,<br>The ${requestData.seniorCenterName} Team</p>
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
        to: [requestData.teenEmail],
        subject: emailSubject,
        html: emailHtml,
      }),
    });

    const emailResult = await emailResponse.json();
    
    if (!emailResponse.ok) {
      console.error("❌ Resend API error:", emailResult);
      throw new Error(`Resend API failed: ${emailResult.message || 'Unknown error'}`);
    }
    
    console.log("✅ Approval confirmation email sent successfully:", emailResult);

    return new Response(JSON.stringify(emailResult), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("❌ Error in send-approval-confirmation function:", error);
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