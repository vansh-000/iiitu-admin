import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Link,
} from '@react-pdf/renderer';
import { StaticLinkProvider } from './StaticLinkProvider';

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  subheader: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    marginBottom: 10,
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#bfbfbf',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 10,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
    flex: 1,
    textAlign: 'center',
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  noData: {
    fontSize: 12,
    color: '#808080',
    textAlign: 'center',
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
    objectFit: 'cover',
  },
});

const ResumePdf = ({
  faculty: {
    name,
    designation,
    department,
    mobile,
    profileImage,
    researchInterest,
    socialLink,
    Education,
    Experience,
    journals,
    publications,
    Research,
    projects,
    Supervision,
    Workshop,
    AwardAndHonours,
    other,
  },
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section with Profile Image */}
        <View style={styles.section}>
          <Text style={styles.header}>{name}</Text>
          <Text style={styles.text}>
            {designation} ({department})
          </Text>
          <Text style={styles.text}>Mobile: {mobile}</Text>
          <Text style={styles.text}>Research Interest: {researchInterest}</Text>

          {/* Profile Image */}
          {profileImage && (
            <Image
              style={styles.image}
              src={StaticLinkProvider(profileImage)}
            />
          )}

          {/* Social Links */}
          {socialLink?.length > 0 && (
            <View>
              {socialLink.map((link, index) => (
                <Text key={index} style={styles.text}>
                  {link.social === 'Linkedin' && link.link !== '' && (
                    <>
                      LinkedIn: <Link src={link.link}>{link.link}</Link>
                    </>
                  )}
                  {link.social === 'Website' && link.link !== '' && (
                    <>
                      Website: <Link src={link.link}>{link.link}</Link>
                    </>
                  )}
                  {link.social === 'GoogleScholar' && link.link !== '' && (
                    <>
                      Google Scholar: <Link src={link.link}>{link.link}</Link>
                    </>
                  )}
                  {link.social === 'Orcid' && link.link !== '' && (
                    <>
                      ORCID: <Link src={link.link}>{link.link}</Link>
                    </>
                  )}
                </Text>
              ))}
            </View>
          )}
        </View>

        {/* Education Section in Tabular Form */}
        {Education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subheader}>Education</Text>

            <View style={styles.table}>
              {/* Table Header */}
              <View style={styles.tableHeader}>
                <Text style={[styles.tableCellHeader, { flex: 1 }]}>Start</Text>
                <Text style={[styles.tableCellHeader, { flex: 1 }]}>End</Text>
                <Text style={[styles.tableCellHeader, { flex: 3 }]}>
                  University
                </Text>
              </View>

              {/* Table Body */}
              {Education?.map((edu, index) => (
                <View style={styles.tableRow} key={index}>
                  <Text style={[styles.tableCell, { flex: 1 }]}>
                    {edu.dateOfStart}
                  </Text>
                  <Text style={[styles.tableCell, { flex: 1 }]}>
                    {edu.dateOfEnd}
                  </Text>
                  <Text style={[styles.tableCell, { flex: 3 }]}>
                    {edu.description}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Experience Section */}
        {Experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subheader}>Experience</Text>
            <View style={styles.table}>
              {/* Table Header */}
              <View style={styles.tableHeader}>
                <Text style={[styles.tableCellHeader, { flex: 1 }]}>Start</Text>
                <Text style={[styles.tableCellHeader, { flex: 1 }]}>End</Text>
                <Text style={[styles.tableCellHeader, { flex: 3 }]}>
                  University
                </Text>
              </View>

              {/* Table Body */}
              {Experience?.map((exp, index) => (
                <View style={styles.tableRow} key={index}>
                  <Text style={[styles.tableCell, { flex: 1 }]}>
                    {exp.position}
                  </Text>
                  <Text style={[styles.tableCell, { flex: 1 }]}>
                    {exp.years}
                  </Text>
                  <Text style={[styles.tableCell, { flex: 3 }]}>
                    {exp.organisation}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Teaching Interest Section */}
        {Research?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subheader}>Teaching Interest</Text>
            <View style={styles.table}>
              {/* Table Header */}
              <View style={styles.tableHeader}>
                <Text style={[styles.tableCellHeader, { flex: 1 }]}>
                  Interests
                </Text>
              </View>

              {/* Table Body */}
              {Research?.map((res, index) => (
                <View style={styles.tableRow} key={index}>
                  <Text style={[styles.tableCell, { flex: 1 }]}>{res}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Research Supervision Section */}
        {Supervision?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subheader}>Research Supervision</Text>
            <View style={styles.table}>
              {/* Table Header */}
              <View style={styles.tableHeader}>
                <Text style={[styles.tableCellHeader, { flex: 1 }]}>
                  Program
                </Text>
                <Text style={[styles.tableCellHeader, { flex: 1 }]}>
                  Scholar
                </Text>
                <Text style={[styles.tableCellHeader, { flex: 2 }]}>
                  Research Topic
                </Text>
                <Text style={[styles.tableCellHeader, { flex: 1 }]}>
                  Status
                </Text>
                <Text style={[styles.tableCellHeader, { flex: 1 }]}>Year</Text>
                <Text style={[styles.tableCellHeader, { flex: 1 }]}>
                  Co-Supervisors
                </Text>
              </View>

              {/* Table Body */}
              {Supervision?.map((res, index) => (
                <View style={styles.tableRow} key={index}>
                  <Text style={[styles.tableCell, { flex: 1 }]}>
                    {res.program}
                  </Text>
                  <Text style={[styles.tableCell, { flex: 1 }]}>
                    {res.scholar}
                  </Text>
                  <Text style={[styles.tableCell, { flex: 2 }]}>
                    {res.topic}
                  </Text>
                  <Text style={[styles.tableCell, { flex: 1 }]}>
                    {res.status}
                  </Text>
                  <Text style={[styles.tableCell, { flex: 1 }]}>
                    {res.year}
                  </Text>
                  <Text style={[styles.tableCell, { flex: 1 }]}>
                    {res.co_super}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Awards and Honours Section */}
        {AwardAndHonours?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subheader}>Awards and Honours</Text>
            <View style={styles.table}>
              {/* Table Header */}
              <View style={styles.tableHeader}>
                <Text style={[styles.tableCellHeader, { flex: 1 }]}>
                  Awards
                </Text>
              </View>

              {/* Table Body */}
              {AwardAndHonours?.map((award, index) => (
                <View style={styles.tableRow} key={index}>
                  <Text style={[styles.tableCell, { flex: 1 }]}>{award}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Workshop Section */}
        {Workshop?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subheader}>Workshops</Text>
            <View style={styles.table}>
              {/* Table Header */}
              <View style={styles.tableHeader}>
                <Text style={[styles.tableCellHeader, { flex: 1 }]}>Type</Text>
                <Text style={[styles.tableCellHeader, { flex: 1 }]}>Title</Text>
                <Text style={[styles.tableCellHeader, { flex: 1 }]}>Venue</Text>
                <Text style={[styles.tableCellHeader, { flex: 1 }]}>From</Text>
                <Text style={[styles.tableCellHeader, { flex: 1 }]}>To</Text>
                <Text style={[styles.tableCellHeader, { flex: 1 }]}>
                  Designation
                </Text>
              </View>

              {/* Table Body */}
              {Workshop?.map((work, index) => (
                <View style={styles.tableRow} key={index}>
                  <Text style={[styles.tableCell, { flex: 1 }]}>
                    {work.type}
                  </Text>
                  <Text style={[styles.tableCell, { flex: 1 }]}>
                    {work.title}
                  </Text>
                  <Text style={[styles.tableCell, { flex: 1 }]}>
                    {work.venue}
                  </Text>
                  <Text style={[styles.tableCell, { flex: 1 }]}>
                    {work.from}
                  </Text>
                  <Text style={[styles.tableCell, { flex: 1 }]}>{work.to}</Text>
                  <Text style={[styles.tableCell, { flex: 1 }]}>
                    {work.designation}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Others Section */}
        {other?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subheader}>Others</Text>
            <View style={styles.table}>
              {/* Table Header */}
              <View style={styles.tableHeader}>
                <Text style={[styles.tableCellHeader, { flex: 1 }]}>
                  Others
                </Text>
              </View>

              {/* Table Body */}
              {other?.map((other, index) => (
                <View style={styles.tableRow} key={index}>
                  <Text style={[styles.tableCell, { flex: 1 }]}>{other}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ResumePdf;
