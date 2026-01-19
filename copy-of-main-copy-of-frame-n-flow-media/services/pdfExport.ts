import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generateUserActivityPDF = (activityData: any) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Title
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('User Activity Report', pageWidth / 2, 20, { align: 'center' });

    // Export Date
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Export Date: ${new Date(activityData.exportDate).toLocaleDateString()}`, 14, 30);

    let yPos = 40;

    // Partner Information
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Partner Information', 14, yPos);
    yPos += 10;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Name: ${activityData.application?.full_name || 'N/A'}`, 14, yPos);
    yPos += 6;
    doc.text(`Email: ${activityData.application?.email || 'N/A'}`, 14, yPos);
    yPos += 6;
    doc.text(`Stage: ${activityData.partner?.stage || 'N/A'}`, 14, yPos);
    yPos += 6;
    doc.text(`Total Earnings: ₹${activityData.partner?.earnings_total || 0}`, 14, yPos);
    yPos += 10;

    // Outreach Logs Summary
    if (activityData.outreachLogs && activityData.outreachLogs.length > 0) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Outreach Activity Summary', 14, yPos);
        yPos += 10;

        const totalOutreach = activityData.outreachLogs.reduce((sum: number, log: any) => sum + (log.count || 0), 0);
        const totalLeads = activityData.outreachLogs.reduce((sum: number, log: any) => sum + (log.interested || 0), 0);

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`Total Outreach: ${totalOutreach}`, 14, yPos);
        yPos += 6;
        doc.text(`Total Leads Generated: ${totalLeads}`, 14, yPos);
        yPos += 6;
        doc.text(`Total Logs: ${activityData.outreachLogs.length}`, 14, yPos);
        yPos += 10;
    }

    // Earnings Summary
    if (activityData.earnings && activityData.earnings.length > 0) {
        if (yPos > 250) {
            doc.addPage();
            yPos = 20;
        }

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Earnings History', 14, yPos);
        yPos += 10;

        const earningsTableData = activityData.earnings.map((e: any) => [
            new Date(e.deal_closed_date).toLocaleDateString(),
            e.client_name,
            `₹${e.deal_value}`,
            `${e.commission_percentage}%`,
            `₹${e.amount}`,
            e.status
        ]);

        (doc as any).autoTable({
            startY: yPos,
            head: [['Date', 'Client', 'Deal Value', 'Commission %', 'Amount', 'Status']],
            body: earningsTableData,
            theme: 'grid',
            headStyles: { fillColor: [66, 66, 66] },
            styles: { fontSize: 8 }
        });

        yPos = (doc as any).lastAutoTable.finalY + 10;
    }

    // Leads Summary
    if (activityData.leads && activityData.leads.length > 0) {
        if (yPos > 250) {
            doc.addPage();
            yPos = 20;
        }

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Leads Summary', 14, yPos);
        yPos += 10;

        const leadsTableData = activityData.leads.map((l: any) => [
            new Date(l.created_at).toLocaleDateString(),
            l.business_name,
            l.contact_person || 'N/A',
            l.source_platform,
            l.status
        ]);

        (doc as any).autoTable({
            startY: yPos,
            head: [['Date', 'Business', 'Contact', 'Source', 'Status']],
            body: leadsTableData,
            theme: 'grid',
            headStyles: { fillColor: [66, 66, 66] },
            styles: { fontSize: 8 }
        });
    }

    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'italic');
        doc.text(
            `Page ${i} of ${pageCount}`,
            pageWidth / 2,
            doc.internal.pageSize.getHeight() - 10,
            { align: 'center' }
        );
    }

    return doc;
};

export const downloadUserActivityPDF = async (partnerId: string, partnerName: string, getUserActivityData: Function) => {
    try {
        const activityData = await getUserActivityData(partnerId);

        if (!activityData) {
            alert('Failed to fetch user activity data');
            return false;
        }

        const doc = generateUserActivityPDF(activityData);
        doc.save(`${partnerName.replace(/\s+/g, '_')}_Activity_Report_${new Date().toISOString().split('T')[0]}.pdf`);

        return true;
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Failed to generate PDF: ' + error);
        return false;
    }
};
